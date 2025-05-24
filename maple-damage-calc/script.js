let $ = selector => document.querySelector(selector);

window.onload = function() {
  console.log("hi~");
  let minMastery = 10;
  let HEAL_MIN_TARGETS_MULTI = 4.0;
  let HEAL_MAX_TARGETS_MULTI = 2.333;

  function calculateRange({ primary, secondary, mastery, watk }) {
    let min = ((primary * 0.9 * mastery + secondary) * watk) / 100;
    let max = ((primary + secondary) * watk) / 100;
    return { min, max };
  }

  function doMelee({ weapon, str, dex, int, luk, watk, mastery }) {
    let swings = weapons[weapon];
    swings = Array.isArray(swings) ? swings : [swings];

    let minOfAll = null;
    let maxOfAll = null;
    let allRanges = [];

    for (let swing of swings) {
      let { primary, secondary } = swing({ str, dex, int, luk });
      let { min, max } = calculateRange({ primary, secondary, mastery, watk });
      minOfAll = minOfAll == null ? min : Math.min(minOfAll, min);
      maxOfAll = maxOfAll == null ? max : Math.max(maxOfAll, max);
      allRanges = allRanges.concat({ min, max });
    }

    $("#result").innerText = `Range: ${Math.floor(minOfAll)} - ${Math.floor(
      maxOfAll
    )}`;

    if (allRanges.length > 1) {
      let swinging = `(Swinging range: ${Math.floor(
        allRanges[0].min
      )} - ${Math.floor(allRanges[0].max)})`;
      let stabbing = `(Stabbing range: ${Math.floor(
        allRanges[1].min
      )} - ${Math.floor(allRanges[1].max)})`;
      $("#result").innerText = `${
        $("#result").innerText
      }\n${swinging}\n${stabbing}`;
    }
  }

  function doMagic({ weapon, int, luk, matk, mastery, spellAttack }) {
    let spell = spells[weapon];

    let min = spell.min({ matk, mastery, int, luk, spellAttack });
    let max = spell.max({ matk, mastery, int, luk, spellAttack });
    $("#result").innerText = `Range: ${Math.floor(min)} - ${Math.floor(max)}`;
  }

  let weapons = {
    "One Handed Sword": ({ str, dex, int, luk }) => ({
      primary: str * 4.0,
      secondary: dex
    }),
    "One Handed Axe/BW/Wand/Staff": [
      ({ str, dex, int, luk }) => ({
        primary: str * 4.4,
        secondary: dex
      }),
      ({ str, dex, int, luk }) => ({
        primary: str * 3.2,
        secondary: dex
      })
    ],
    "Two Handed Sword": ({ str, dex, int, luk }) => ({
      primary: str * 4.6,
      secondary: dex
    }),
    "Two Handed Axe/BW": [
      ({ str, dex, int, luk }) => ({
        primary: str * 4.8,
        secondary: dex
      }),
      ({ str, dex, int, luk }) => ({
        primary: str * 3.4,
        secondary: dex
      })
    ],
    Spear: [
      ({ str, dex, int, luk }) => ({
        primary: str * 3.0,
        secondary: dex
      }),
      ({ str, dex, int, luk }) => ({
        primary: str * 5.0,
        secondary: dex
      })
    ],
    Polearm: [
      ({ str, dex, int, luk }) => ({
        primary: str * 5.0,
        secondary: dex
      }),
      ({ str, dex, int, luk }) => ({
        primary: str * 3.0,
        secondary: dex
      })
    ],
    "Dagger (Non-thieves)": ({ str, dex, int, luk }) => ({
      primary: str * 4.0,
      secondary: dex
    }),
    "Dagger & Claw/Throwing Knives (Thieves)": ({ str, dex, int, luk }) => ({
      primary: luk * 3.6,
      secondary: str + dex
    }),
    Bow: ({ str, dex, int, luk }) => ({
      primary: dex * 3.4,
      secondary: str
    }),
    Crossbow: ({ str, dex, int, luk }) => ({
      primary: dex * 3.6,
      secondary: str
    }),
    Knuckle: ({ str, dex, int, luk }) => ({
      primary: str * 4.8,
      secondary: dex
    }),
    Gun: ({ str, dex, int, luk }) => ({
      primary: dex * 3.6,
      secondary: str
    })
  };

  let spells = {
    Heal: {
      min: ({ matk, mastery, int, luk, spellAttack }) =>
        (((int * 0.3 + luk) * matk) / 1000) * HEAL_MAX_TARGETS_MULTI,
      max: ({ matk, mastery, int, luk, spellAttack }) =>
        (((int * 1.2 + luk) * matk) / 1000) * HEAL_MIN_TARGETS_MULTI
    },
    "Other spells": {
      min: ({ matk, mastery, int, luk, spellAttack }) =>
        ((matk ** 2 / 1000 + matk * mastery * 0.9) / 30 + int / 200) *
        spellAttack,
      max: ({ matk, mastery, int, luk, spellAttack }) =>
        ((matk ** 2 / 1000 + matk) / 30 + int / 200) * spellAttack
    }
  };

  let weaponGroups = [
    { name: "Weapons", list: Object.keys(weapons) },
    { name: "Spells", list: Object.keys(spells) }
  ];
  weaponGroups.forEach(weaponGroup => {
    let optgroup = document.createElement("OPTGROUP");
    optgroup.label = weaponGroup.name;
    weaponGroup.list.forEach(weapon => {
      let option = document.createElement("OPTION");
      option.innerText = weapon;
      optgroup.appendChild(option);
    });
    $("#weapon").appendChild(optgroup);
  });

  $("#form").onsubmit = function(event) {
    event.preventDefault();

    let weapon = $("#weapon").value;
    let str = parseInt($("#str").value, 10);
    let dex = parseInt($("#dex").value, 10);
    let int = parseInt($("#int").value, 10);
    let luk = parseInt($("#luk").value, 10);
    let watk = parseInt($("#atk").value, 10);
    let matk = parseInt($("#matk").value, 10);
    let spellAttack = parseInt($("#spatk").value, 10);
    let mastery = parseInt($("#mastery").value, 10);

    mastery = mastery < minMastery ? minMastery : mastery;
    mastery = mastery / 100;

    console.log({
      weapon,
      str,
      dex,
      int,
      luk,
      watk,
      matk,
      mastery
    });

    if (weapon in weapons) {
      doMelee({ weapon, str, dex, int, luk, watk, mastery });
    } else if (weapon in spells) {
      doMagic({ weapon, int, luk, matk, spellAttack, mastery });
    }
  };

  $("#title-input").oninput = function() {
    $("#title-visual").innerText = $("#title-input").value;
  };
  $("#title-visual").innerText = $("#title-input").value;
};
