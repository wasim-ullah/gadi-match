(function () {
  "use strict";

  // ---------- DATA ----------

  var AXES = ["rugged", "luxury", "practical", "speed"];

  var QUESTIONS = [
    {
      text: "City lights or desert dust?",
      options: [
        { label: "City lights", scores: { speed: 1, luxury: 1 } },
        { label: "Desert dust", scores: { rugged: 2 } }
      ]
    },
    {
      text: "You arrive:",
      options: [
        { label: "Fashionably late", scores: { luxury: 2 } },
        { label: "Exactly on time", scores: { practical: 2 } },
        { label: "20 mins early", scores: { practical: 1, rugged: 1 } }
      ]
    },
    {
      text: "Your playlist on a drive:",
      options: [
        { label: "Arabic trap", scores: { speed: 2 } },
        { label: "Old Bollywood", scores: { luxury: 1, practical: 1 } },
        { label: "Total silence", scores: { rugged: 1, practical: 1 } }
      ]
    },
    {
      text: "Loud exhaust or whisper quiet?",
      options: [
        { label: "Loud exhaust", scores: { speed: 2 } },
        { label: "Whisper quiet", scores: { luxury: 2 } }
      ]
    },
    {
      text: "Wash it weekly or let the sand tell the story?",
      options: [
        { label: "Wash it weekly", scores: { luxury: 2 } },
        { label: "Let the sand tell the story", scores: { rugged: 2 } }
      ]
    },
    {
      text: "Off-road or off-limits?",
      options: [
        { label: "Off-road", scores: { rugged: 2 } },
        { label: "Off-limits", scores: { luxury: 1, speed: 1 } }
      ]
    },
    {
      text: "Flex it or hide it?",
      options: [
        { label: "Flex it", scores: { luxury: 2 } },
        { label: "Hide it", scores: { practical: 2 } }
      ]
    },
    {
      text: "Fix it yourself or call someone?",
      options: [
        { label: "Fix it myself", scores: { rugged: 1, practical: 1 } },
        { label: "Call someone", scores: { luxury: 1, speed: 1 } }
      ]
    }
  ];

  var RESULTS = window.GADI_DATA.RESULTS;
  var ICONS = window.GADI_DATA.ICONS;

  // primary -> secondary -> result key, with defaults per primary
  var MATCH_TABLE = {
    rugged: { speed: "weekend_warrior", practical: "desert_king", luxury: "show_stopper", default: "desert_king" },
    practical: { rugged: "practical_one", luxury: "quiet_flex", speed: "old_reliable", default: "old_reliable" },
    luxury: { speed: "smooth_operator", rugged: "show_stopper", practical: "quiet_flex", default: "smooth_operator" },
    speed: { luxury: "smooth_operator", practical: "city_hustler", rugged: "weekend_warrior", default: "city_hustler" }
  };

  // ---------- STATE ----------

  var state = {
    index: 0,
    scores: { rugged: 0, luxury: 0, practical: 0, speed: 0 },
    resultKey: null
  };

  // ---------- ELEMENTS ----------

  var screenLanding = document.getElementById("screen-landing");
  var screenQuiz = document.getElementById("screen-quiz");
  var screenResult = document.getElementById("screen-result");
  var startBtn = document.getElementById("start-btn");
  var progressFill = document.getElementById("progress-fill");
  var cardStack = document.getElementById("card-stack");
  var retakeBtn = document.getElementById("retake-btn");
  var shareBtn = document.getElementById("share-btn");
  var whatsappShare = document.getElementById("whatsapp-share");
  var emailShare = document.getElementById("email-share");
  var shareLinkInput = document.getElementById("share-link-input");
  var shareLinkCopy = document.getElementById("share-link-copy");

  // ---------- NAVIGATION ----------

  function showScreen(el) {
    [screenLanding, screenQuiz, screenResult].forEach(function (s) {
      s.classList.remove("active");
    });
    el.classList.add("active");
  }

  function resetState() {
    state.index = 0;
    state.scores = { rugged: 0, luxury: 0, practical: 0, speed: 0 };
  }

  // ---------- QUIZ RENDERING ----------

  function renderQuestion(index, direction) {
    var q = QUESTIONS[index];
    var card = document.createElement("div");
    card.className = "quiz-card";

    var num = document.createElement("div");
    num.className = "question-number";
    num.textContent = "QUESTION " + (index + 1) + " / " + QUESTIONS.length;

    var text = document.createElement("div");
    text.className = "question-text";
    text.textContent = q.text;

    var opts = document.createElement("div");
    opts.className = "options";

    q.options.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = opt.label;
      btn.addEventListener("click", function () {
        handleAnswer(opt.scores);
      });
      opts.appendChild(btn);
    });

    card.appendChild(num);
    card.appendChild(text);
    card.appendChild(opts);

    cardStack.innerHTML = "";
    cardStack.appendChild(card);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        card.classList.add("visible");
      });
    });

    progressFill.style.width = ((index) / QUESTIONS.length * 100) + "%";
  }

  function handleAnswer(scores) {
    if (state.index >= QUESTIONS.length) return;

    Object.keys(scores).forEach(function (axis) {
      state.scores[axis] += scores[axis];
    });

    var currentCard = cardStack.querySelector(".quiz-card");
    if (currentCard) {
      currentCard.classList.add("leaving");
      currentCard.classList.remove("visible");
    }

    setTimeout(function () {
      state.index += 1;
      if (state.index >= QUESTIONS.length) {
        progressFill.style.width = "100%";
        showResult();
      } else {
        renderQuestion(state.index);
      }
    }, 300);
  }

  // ---------- SCORING ----------

  function computeResultKey() {
    var entries = AXES.map(function (axis) {
      return { axis: axis, value: state.scores[axis] };
    });
    entries.sort(function (a, b) { return b.value - a.value; });

    var primary = entries[0].axis;
    var secondary = entries[1].axis;

    var table = MATCH_TABLE[primary];
    return table[secondary] || table.default;
  }

  // ---------- RESULT RENDERING ----------

  function showResult() {
    cardStack.innerHTML = "";

    var key = computeResultKey();
    var result = RESULTS[key];

    state.resultKey = key;
    localStorage.setItem("gadiMatchResultKey", key);

    document.getElementById("result-icon").innerHTML = ICONS[result.icon] || "";
    document.getElementById("result-name").textContent = result.name + " — " + result.car;
    document.getElementById("result-tagline").textContent = result.tagline;
    document.getElementById("result-desc").textContent = result.desc;

    setupShareLinks(result);

    showScreen(screenResult);
  }

  function setupShareLinks(result) {
    var shareUrl = window.location.origin + "/share/" + result.slug + ".html";
    var shareText = "I got matched to " + result.name + " (" + result.car + ") on Gadi Match. What's yours?";

    shareLinkInput.value = shareUrl;

    whatsappShare.href = "https://wa.me/?text=" + encodeURIComponent(shareText + " " + shareUrl);

    emailShare.href = "mailto:?subject=" + encodeURIComponent("My Gadi Match result: " + result.name) +
      "&body=" + encodeURIComponent(shareText + "\n\n" + shareUrl);
  }

  // ---------- SHARE / DOWNLOAD ----------

  function downloadResultCard() {
    var card = document.getElementById("result-card");
    shareBtn.disabled = true;
    var originalLabel = shareBtn.textContent;
    shareBtn.textContent = "Rendering...";

    html2canvas(card, {
      backgroundColor: "#ffffff",
      scale: 2
    }).then(function (canvas) {
      var link = document.createElement("a");
      link.download = "gadi-match-result.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      shareBtn.disabled = false;
      shareBtn.textContent = originalLabel;
    }).catch(function () {
      shareBtn.disabled = false;
      shareBtn.textContent = originalLabel;
    });
  }

  // ---------- EVENTS ----------

  startBtn.addEventListener("click", function () {
    resetState();
    showScreen(screenQuiz);
    renderQuestion(0);
  });

  retakeBtn.addEventListener("click", function () {
    resetState();
    showScreen(screenLanding);
  });

  shareBtn.addEventListener("click", downloadResultCard);

  shareLinkCopy.addEventListener("click", function () {
    shareLinkInput.select();
    var originalLabel = shareLinkCopy.textContent;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareLinkInput.value).then(function () {
        shareLinkCopy.textContent = "Copied";
        setTimeout(function () { shareLinkCopy.textContent = originalLabel; }, 1500);
      });
    } else {
      document.execCommand("copy");
      shareLinkCopy.textContent = "Copied";
      setTimeout(function () { shareLinkCopy.textContent = originalLabel; }, 1500);
    }
  });
})();
