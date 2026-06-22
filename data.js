window.GADI_DATA = (function () {
  "use strict";

  var RESULTS = {
    desert_king: {
      slug: "desert-king",
      name: "The Desert King",
      car: "Toyota Land Cruiser",
      tagline: "Built for dunes, not driveways.",
      desc: "You don't follow roads, you make them. Comfort means nothing if it can't survive a sandstorm. People trust you to get them home — even when home is two dunes past the GPS signal.",
      icon: "rugged",
      matches: [
        { name: "Toyota Land Cruiser GXR", price: "AED 220,000 – 260,000", where: "Al Futtaim Toyota, Sheikh Zayed Road, Dubai" },
        { name: "Nissan Patrol Super Safari", price: "AED 180,000 – 210,000", where: "Arabian Automobiles, Dubai" },
        { name: "Toyota Land Cruiser Hardtop", price: "AED 160,000 – 190,000", where: "Al Aweer Auto Market, Dubai" }
      ]
    },
    weekend_warrior: {
      slug: "weekend-warrior",
      name: "The Weekend Warrior",
      car: "Ford Raptor",
      tagline: "Monday to Friday: normal. Saturday: send it.",
      desc: "You live a double life — spreadsheets by day, sand dunes by sunset. You want power and ground clearance in equal measure, and you've never met a dune you didn't want to send.",
      icon: "speed-rugged",
      matches: [
        { name: "Ford Raptor F-150", price: "AED 230,000 – 270,000", where: "Al Tayer Motors, Dubai" },
        { name: "Toyota Hilux GR Sport", price: "AED 140,000 – 165,000", where: "Al Futtaim Toyota, Sharjah" },
        { name: "Nissan Patrol Nismo", price: "AED 200,000 – 230,000", where: "Arabian Automobiles, Abu Dhabi" }
      ]
    },
    practical_one: {
      slug: "practical-one",
      name: "The Practical One",
      car: "Nissan Patrol",
      tagline: "Big enough for the family, tough enough for the desert.",
      desc: "You want it all and you refuse to compromise — space, strength, and zero drama. You're the friend who plans the road trip and the one everyone calls when the trip goes sideways.",
      icon: "practical-rugged",
      matches: [
        { name: "Nissan Patrol LE", price: "AED 230,000 – 260,000", where: "Arabian Automobiles, Dubai" },
        { name: "Toyota Land Cruiser GXR", price: "AED 220,000 – 250,000", where: "Al Futtaim Toyota, Dubai" },
        { name: "Toyota Fortuner", price: "AED 110,000 – 135,000", where: "Al Futtaim Toyota, Sharjah" }
      ]
    },
    old_reliable: {
      slug: "old-reliable",
      name: "The Old Reliable",
      car: "Toyota Camry",
      tagline: "Never the loudest. Always the one that starts.",
      desc: "You're not chasing attention, you're chasing reliability. Your car will outlive three relationships and still pass inspection. Quietly, you're the smartest person in every parking lot.",
      icon: "practical",
      matches: [
        { name: "Toyota Camry SE", price: "AED 95,000 – 115,000", where: "Al Futtaim Toyota, Dubai" },
        { name: "Honda Accord", price: "AED 90,000 – 110,000", where: "Al Futtaim Honda, Dubai" },
        { name: "Nissan Altima", price: "AED 75,000 – 90,000", where: "Arabian Automobiles, Sharjah" }
      ]
    },
    smooth_operator: {
      slug: "smooth-operator",
      name: "The Smooth Operator",
      car: "BMW 5 Series",
      tagline: "Confidence at 120, calm at a red light.",
      desc: "You like things fast but composed — no wasted motion, no wasted noise. You'd rather be quietly impressive than loudly trying. Everyone notices anyway.",
      icon: "luxury-speed",
      matches: [
        { name: "BMW 5 Series 530i", price: "AED 230,000 – 270,000", where: "AGMC BMW, Dubai" },
        { name: "Mercedes E-Class", price: "AED 220,000 – 260,000", where: "Gargash Mercedes, Dubai" },
        { name: "Audi A6", price: "AED 210,000 – 250,000", where: "Al Nabooda Audi, Dubai" }
      ]
    },
    show_stopper: {
      slug: "show-stopper",
      name: "The Show Stopper",
      car: "Mercedes G-Wagon",
      tagline: "Subtle was never the plan.",
      desc: "You arrive and the room rearranges itself around you. Rugged on paper, royalty in practice — you want power that photographs well from every angle.",
      icon: "luxury-rugged",
      matches: [
        { name: "Mercedes G63 AMG", price: "AED 750,000 – 900,000", where: "Gargash Mercedes, Dubai" },
        { name: "Range Rover Sport", price: "AED 350,000 – 420,000", where: "Al Tayer Motors, Dubai" },
        { name: "GMC Yukon Denali", price: "AED 280,000 – 320,000", where: "Al Ghandi GMC, Dubai" }
      ]
    },
    quiet_flex: {
      slug: "quiet-flex",
      name: "The Quiet Flex",
      car: "Lexus LX",
      tagline: "Whisper quiet. Impossible to ignore.",
      desc: "You don't need the loudest exhaust to be the most respected car in the lot. Understated, immaculate, and engineered so well that flexing feels beneath you — but you still do it.",
      icon: "luxury-practical",
      matches: [
        { name: "Lexus LX 600", price: "AED 420,000 – 480,000", where: "Al Futtaim Lexus, Dubai" },
        { name: "Range Rover Vogue", price: "AED 380,000 – 440,000", where: "Al Tayer Motors, Dubai" },
        { name: "Lexus GX 460", price: "AED 250,000 – 290,000", where: "Al Futtaim Lexus, Sharjah" }
      ]
    },
    city_hustler: {
      slug: "city-hustler",
      name: "The City Hustler",
      car: "Honda Civic Type R",
      tagline: "Small footprint. Big appetite for speed.",
      desc: "Traffic lights are just the start of your next race. You don't need size to win — you need reflexes, a tight grip, and a playlist that matches your heart rate.",
      icon: "speed",
      matches: [
        { name: "Honda Civic Type R", price: "AED 150,000 – 175,000", where: "Al Futtaim Honda, Dubai" },
        { name: "Hyundai Veloster N", price: "AED 110,000 – 130,000", where: "Juma Al Majid Hyundai, Dubai" },
        { name: "VW Golf GTI", price: "AED 120,000 – 140,000", where: "Al Nabooda VW, Dubai" }
      ]
    }
  };

  var ICONS = {
    "rugged": '<svg viewBox="0 0 100 100"><polygon points="50,10 90,35 90,75 50,95 10,75 10,35" fill="none" stroke="#111111" stroke-width="5"/><rect x="35" y="40" width="30" height="20" fill="#111111"/></svg>',
    "speed-rugged": '<svg viewBox="0 0 100 100"><polygon points="50,8 92,30 92,70 50,92 8,70 8,30" fill="none" stroke="#111111" stroke-width="5"/><path d="M25 55 L45 55 L40 40 L60 40 L55 55 L75 55" fill="none" stroke="#111111" stroke-width="5"/></svg>',
    "practical-rugged": '<svg viewBox="0 0 100 100"><rect x="15" y="25" width="70" height="50" rx="4" fill="none" stroke="#111111" stroke-width="5"/><circle cx="35" cy="80" r="8" fill="#111111"/><circle cx="65" cy="80" r="8" fill="#111111"/></svg>',
    "practical": '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="#111111" stroke-width="5"/><circle cx="50" cy="50" r="12" fill="#111111"/></svg>',
    "luxury-speed": '<svg viewBox="0 0 100 100"><polygon points="10,60 30,30 70,30 90,60 70,85 30,85" fill="none" stroke="#111111" stroke-width="5"/></svg>',
    "luxury-rugged": '<svg viewBox="0 0 100 100"><rect x="20" y="20" width="60" height="60" fill="none" stroke="#111111" stroke-width="5"/><polygon points="50,30 70,50 50,70 30,50" fill="#111111"/></svg>',
    "luxury-practical": '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="none" stroke="#111111" stroke-width="5"/><polygon points="50,22 78,50 50,78 22,50" fill="none" stroke="#111111" stroke-width="4"/></svg>',
    "speed": '<svg viewBox="0 0 100 100"><polygon points="20,80 50,10 80,80 50,60" fill="#111111"/></svg>'
  };

  return { RESULTS: RESULTS, ICONS: ICONS };
})();
