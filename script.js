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

  var RESULTS = {
    desert_king: {
      name: "The Desert King",
      car: "Toyota Land Cruiser",
      tagline: "Built for dunes, not driveways.",
      desc: "You don't follow roads, you make them. Comfort means nothing if it can't survive a sandstorm. People trust you to get them home — even when home is two dunes past the GPS signal.",
      icon: "rugged"
    },
    weekend_warrior: {
      name: "The Weekend Warrior",
      car: "Ford Raptor",
      tagline: "Monday to Friday: normal. Saturday: send it.",
      desc: "You live a double life — spreadsheets by day, sand dunes by sunset. You want power and ground clearance in equal measure, and you've never met a dune you didn't want to send.",
      icon: "speed-rugged"
    },
    practical_one: {
      name: "The Practical One",
      car: "Nissan Patrol",
      tagline: "Big enough for the family, tough enough for the desert.",
      desc: "You want it all and you refuse to compromise — space, strength, and zero drama. You're the friend who plans the road trip and the one everyone calls when the trip goes sideways.",
      icon: "practical-rugged"
    },
    old_reliable: {
      name: "The Old Reliable",
      car: "Toyota Camry",
      tagline: "Never the loudest. Always the one that starts.",
      desc: "You're not chasing attention, you're chasing reliability. Your car will outlive three relationships and still pass inspection. Quietly, you're the smartest person in every parking lot.",
      icon: "practical"
    },
    smooth_operator: {
      name: "The Smooth Operator",
      car: "BMW 5 Series",
      tagline: "Confidence at 120, calm at a red light.",
      desc: "You like things fast but composed — no wasted motion, no wasted noise. You'd rather be quietly impressive than loudly trying. Everyone notices anyway.",
      icon: "luxury-speed"
    },
    show_stopper: {
      name: "The Show Stopper",
      car: "Mercedes G-Wagon",
      tagline: "Subtle was never the plan.",
      desc: "You arrive and the room rearranges itself around you. Rugged on paper, royalty in practice — you want power that photographs well from every angle.",
      icon: "luxury-rugged"
    },
    quiet_flex: {
      name: "The Quiet Flex",
      car: "Lexus LX",
      tagline: "Whisper quiet. Impossible to ignore.",
      desc: "You don't need the loudest exhaust to be the most respected car in the lot. Understated, immaculate, and engineered so well that flexing feels beneath you — but you still do it.",
      icon: "luxury-practical"
    },
    city_hustler: {
      name: "The City Hustler",
      car: "Honda Civic Type R",
      tagline: "Small footprint. Big appetite for speed.",
      desc: "Traffic lights are just the start of your next race. You don't need size to win — you need reflexes, a tight grip, and a playlist that matches your heart rate.",
      icon: "speed"
    }
  };

  // primary -> secondary -> result key, with defaults per primary
  var MATCH_TABLE = {
    rugged: { speed: "weekend_warrior", practical: "desert_king", luxury: "show_stopper", default: "desert_king" },
    practical: { rugged: "practical_one", luxury: "quiet_flex", speed: "old_reliable", default: "old_reliable" },
    luxury: { speed: "smooth_operator", rugged: "show_stopper", practical: "quiet_flex", default: "smooth_operator" },
    speed: { luxury: "smooth_operator", practical: "city_hustler", rugged: "weekend_warrior", default: "city_hustler" }
  };

  var ICONS = {
    "rugged": '<svg viewBox="0 0 100 100"><polygon points="50,10 90,35 90,75 50,95 10,75 10,35" fill="none" stroke="#f5a623" stroke-width="5"/><rect x="35" y="40" width="30" height="20" fill="#f5a623"/></svg>',
    "speed-rugged": '<svg viewBox="0 0 100 100"><polygon points="50,8 92,30 92,70 50,92 8,70 8,30" fill="none" stroke="#f5a623" stroke-width="5"/><path d="M25 55 L45 55 L40 40 L60 40 L55 55 L75 55" fill="none" stroke="#f5a623" stroke-width="5"/></svg>',
    "practical-rugged": '<svg viewBox="0 0 100 100"><rect x="15" y="25" width="70" height="50" rx="10" fill="none" stroke="#f5a623" stroke-width="5"/><circle cx="35" cy="80" r="8" fill="#f5a623"/><circle cx="65" cy="80" r="8" fill="#f5a623"/></svg>',
    "practical": '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="#f5a623" stroke-width="5"/><circle cx="50" cy="50" r="12" fill="#f5a623"/></svg>',
    "luxury-speed": '<svg viewBox="0 0 100 100"><polygon points="10,60 30,30 70,30 90,60 70,85 30,85" fill="none" stroke="#f5a623" stroke-width="5"/></svg>',
    "luxury-rugged": '<svg viewBox="0 0 100 100"><rect x="20" y="20" width="60" height="60" fill="none" stroke="#f5a623" stroke-width="5"/><polygon points="50,30 70,50 50,70 30,50" fill="#f5a623"/></svg>',
    "luxury-practical": '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="none" stroke="#f5a623" stroke-width="5"/><polygon points="50,22 78,50 50,78 22,50" fill="none" stroke="#f5a623" stroke-width="4"/></svg>',
    "speed": '<svg viewBox="0 0 100 100"><polygon points="20,80 50,10 80,80 50,60" fill="#f5a623"/></svg>'
  };

  // ---------- STATE ----------

  var state = {
    index: 0,
    scores: { rugged: 0, luxury: 0, practical: 0, speed: 0 }
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

    document.getElementById("result-icon").innerHTML = ICONS[result.icon] || "";
    document.getElementById("result-name").textContent = result.name + " — " + result.car;
    document.getElementById("result-tagline").textContent = result.tagline;
    document.getElementById("result-desc").textContent = result.desc;

    showScreen(screenResult);
  }

  // ---------- SHARE / DOWNLOAD ----------

  function downloadResultCard() {
    var card = document.getElementById("result-card");
    shareBtn.disabled = true;
    var originalLabel = shareBtn.textContent;
    shareBtn.textContent = "Rendering...";

    html2canvas(card, {
      backgroundColor: "#1a1a1a",
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
})();
