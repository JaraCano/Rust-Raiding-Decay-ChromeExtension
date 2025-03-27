document.addEventListener("DOMContentLoaded", () => {
  // ----------------------- Mode Toggle -----------------------
  const advancedModeToggle = document.getElementById("advanced-mode-toggle");
  const standardModeSection = document.getElementById("standard-mode");
  const advancedModeSection = document.getElementById("advanced-mode");

  advancedModeToggle.addEventListener("change", (e) => {
    if (e.target.checked) {
      standardModeSection.classList.add("hidden");
      advancedModeSection.classList.remove("hidden");
    } else {
      advancedModeSection.classList.add("hidden");
      standardModeSection.classList.remove("hidden");
    }
  });

  // ----------------------- Data Definitions -----------------------
  //
  // 1) ITEM_COSTS: Approximate or actual resource costs to craft each item.
  //    Adjust these values if any modded servers are in use.
  //
  const ITEM_COSTS = {
    fireArrow: {
      name: "Fire Arrow",
      sulfur: 10,
      gunpowder: 10,
      charcoal: 20,
      metalFragments: 5,
      cloth: 5
    },
    handmadeShell: {
      name: "Handmade Shell",
      sulfur: 5,
      gunpowder: 5,
      charcoal: 10,
      metalFragments: 2
    },
    buckshot: {
      name: "Buckshot",
      sulfur: 15,
      gunpowder: 15,
      charcoal: 30,
      metalFragments: 5
    },
    incendiaryShell: {
      name: "Incendiary Shell",
      sulfur: 25,
      gunpowder: 25,
      charcoal: 50,
      metalFragments: 10,
      cloth: 10
    },
    flamethrower: {
      name: "Flamethrower",
      metalFragments: 100,
      lowGradeFuel: 50,
      pipes: 6
    },
    militaryFlamethrower: {
      name: "Military Flamethrower",
      metalFragments: 200,
      lowGradeFuel: 50,
      pipes: 6,
      techTrash: 2
    },
    molotov: {
      name: "Molotov",
      lowGradeFuel: 50,
      cloth: 50
    },
    beancan: {
      name: "Beancan Grenade",
      sulfur: 120,
      gunpowder: 60,
      charcoal: 180,
      metalFragments: 20
    },
    f1: {
      name: "F1 Grenade",
      sulfur: 180,
      gunpowder: 90,
      charcoal: 270,
      metalFragments: 40
    },
    satchel: {
      name: "Satchel Charge",
      sulfur: 480,
      gunpowder: 240,
      charcoal: 720,
      metalFragments: 80,
      cloth: 10,
      rope: 1
    },
    explosiveAmmo: {
      name: "Explosive Ammo",
      sulfur: 10,
      gunpowder: 20,
      charcoal: 40,
      metalFragments: 10
    },
    rocket: {
      name: "Rocket",
      sulfur: 1400,
      gunpowder: 650,
      charcoal: 1300,
      metalFragments: 110,
      lowGradeFuel: 30,
      pipes: 2
    },
    incendiaryRocket: {
      name: "Incendiary Rocket",
      sulfur: 500,
      gunpowder: 150,
      charcoal: 300,
      metalFragments: 100,
      lowGradeFuel: 10,
      pipes: 2
    },
    hvRocket: {
      name: "High Velocity Rocket",
      sulfur: 150,
      gunpowder: 100,
      charcoal: 200,
      metalFragments: 100,
      pipes: 1
    },
    c4: {
      name: "C4",
      sulfur: 2200,
      gunpowder: 1000,
      charcoal: 2000,
      metalFragments: 200,
      lowGradeFuel: 60,
      cloth: 5,
      techTrash: 2
    },
    heGrenade: {
      name: "HE Grenade",
      sulfur: 300,
      gunpowder: 150,
      charcoal: 300,
      metalFragments: 50
    }
  };

  /*
    2) RAID_DATA: For each structure, define how many of each item are required.
  */
  const RAID_DATA = {
    // -- WALLS --
    "wooden-wall": {
      fireArrow: 125,
      handmadeShell: 93,
      buckshot: 80,
      incendiaryShell: 39,
      flamethrower: 206,
      militaryFlamethrower: 255,
      molotov: 4,
      beancan: 13,
      f1: 59,
      satchel: 3,
      explosiveAmmo: 49,
      rocket: 2,
      incendiaryRocket: 1,
      hvRocket: 9,
      c4: 1,
      heGrenade: 6
    },
    "stone-wall": {
      fireArrow: 0,
      handmadeShell: 556,
      buckshot: 477,
      incendiaryShell: 1000,
      flamethrower: 0,
      militaryFlamethrower: 0,
      molotov: 0,
      beancan: 46,
      f1: 182,
      satchel: 10,
      explosiveAmmo: 185,
      rocket: 4,
      incendiaryRocket: 0,
      hvRocket: 32,
      c4: 2,
      heGrenade: 29
    },
    "sheet-metal-wall": {
      fireArrow: 0,
      handmadeShell: 0,
      buckshot: 0,
      incendiaryShell: 0,
      flamethrower: 0,
      militaryFlamethrower: 0,
      molotov: 0,
      beancan: 112,
      f1: 993,
      satchel: 23,
      explosiveAmmo: 400,
      rocket: 8,
      incendiaryRocket: 0,
      hvRocket: 67,
      c4: 4,
      heGrenade: 57
    },
    "armored-wall": {
      rocket: 15,
      c4: 8,
      satchel: 46,
      explosiveAmmo: 799,
      beancan: 223,
      f1: 1986,
      fireArrow: 0,
      handmadeShell: 0,
      buckshot: 0,
      incendiaryShell: 0,
      flamethrower: 0,
      militaryFlamethrower: 0,
      molotov: 0,
      incendiaryRocket: 0,
      hvRocket: 134,
      heGrenade: 114
    },

    // -- DOORS --
    "wooden-door": {
      fireArrow: 50,
      handmadeShell: 45,
      buckshot: 39,
      incendiaryShell: 16,
      flamethrower: 83,
      militaryFlamethrower: 102,
      molotov: 2,
      beancan: 6,
      f1: 23,
      satchel: 2,
      explosiveAmmo: 19,
      rocket: 1,
      incendiaryRocket: 1,
      hvRocket: 4,
      c4: 1,
      heGrenade: 3
    },
    "sheet-metal-door": {
      fireArrow: 0,
      handmadeShell: 0,
      buckshot: 0,
      incendiaryShell: 0,
      flamethrower: 0,
      militaryFlamethrower: 0,
      molotov: 0,
      beancan: 18,
      f1: 50,
      satchel: 4,
      explosiveAmmo: 63,
      rocket: 2,
      incendiaryRocket: 0,
      hvRocket: 11,
      c4: 1,
      heGrenade: 9
    },
    "armored-door": {
      fireArrow: 0,
      handmadeShell: 0,
      buckshot: 0,
      incendiaryShell: 0,
      flamethrower: 0,
      militaryFlamethrower: 0,
      molotov: 0,
      beancan: 69,
      f1: 200,
      satchel: 15,
      explosiveAmmo: 250,
      rocket: 5,
      incendiaryRocket: 0,
      hvRocket: 42,
      c4: 3,
      heGrenade: 36
    },
    "garage-door": {
      fireArrow: 0,
      handmadeShell: 0,
      buckshot: 0,
      incendiaryShell: 0,
      flamethrower: 0,
      militaryFlamethrower: 0,
      molotov: 0,
      beancan: 42,
      f1: 120,
      satchel: 9,
      explosiveAmmo: 150,
      rocket: 3,
      incendiaryRocket: 0,
      hvRocket: 25,
      c4: 2,
      heGrenade: 22
    },

    // -- HIGH EXTERNAL WALLS --
    "external-wall-wood": {
      fireArrow: 250,
      handmadeShell: 186,
      buckshot: 159,
      incendiaryShell: 77,
      flamethrower: 412,
      militaryFlamethrower: 509,
      molotov: 7,
      beancan: 26,
      f1: 118,
      satchel: 6,
      explosiveAmmo: 98,
      rocket: 3,
      incendiaryRocket: 1,
      hvRocket: 18,
      c4: 2,
      heGrenade: 16
    },
    "external-wall-stone": {
      fireArrow: 0,
      handmadeShell: 556,
      buckshot: 477,
      incendiaryShell: 1000,
      flamethrower: 0,
      militaryFlamethrower: 0,
      molotov: 0,
      beancan: 46,
      f1: 182,
      satchel: 10,
      explosiveAmmo: 185,
      rocket: 4,
      incendiaryRocket: 0,
      hvRocket: 6,
      c4: 2,
      heGrenade: 4
    },

    // -- LADDERS & GRILLS --
    "hatch-grill": {
      fireArrow: 0,
      handmadeShell: 0,
      buckshot: 0,
      incendiaryShell: 0,
      flamethrower: 0,
      militaryFlamethrower: 0,
      molotov: 0,
      beancan: 18,
      f1: 50,
      satchel: 2,
      explosiveAmmo: 19,
      rocket: 2,
      incendiaryRocket: 0,
      hvRocket: 11,
      c4: 1,
      heGrenade: 9
    },

    // -- OTHER (Tool Cupboard, etc.) --
    "tool-cupboard": {
      fireArrow: 6,
      handmadeShell: 23,
      buckshot: 20,
      incendiaryShell: 2,
      flamethrower: 42,
      militaryFlamethrower: 51,
      molotov: 1,
      beancan: 4,
      f1: 43,
      satchel: 1,
      explosiveAmmo: 10,
      rocket: 1,
      incendiaryRocket: 0,
      hvRocket: 2,
      c4: 1,
      heGrenade: 2
    }
  };

  // 3) methodKeyMapping: Connect user-facing method selections to the RAID_DATA keys.
  const methodKeyMapping = {
    fireArrow: "fireArrow",
    handmadeShell: "handmadeShell",
    buckshot: "buckshot",
    incendiaryShell: "incendiaryShell",
    flamethrower: "flamethrower",
    militaryFlamethrower: "militaryFlamethrower",
    molotov: "molotov",
    beancan: "beancan",
    f1: "f1",
    satchel: "satchel",
    explosiveAmmo: "explosiveAmmo",
    rocket: "rocket",
    incendiaryRocket: "incendiaryRocket",
    hvRocket: "hvRocket",
    c4: "c4",
    heGrenade: "heGrenade"
  };

  // ----------------------- Helper Functions -----------------------
  function getStructureKey(target, material) {
    if (target === "wall") {
      if (material === "wood") return "wooden-wall";
      if (material === "stone") return "stone-wall";
      if (material === "sheet-metal") return "sheet-metal-wall";
      if (material === "armored") return "armored-wall";
    }
    if (target === "door") {
      if (material === "wood") return "wooden-door";
      if (material === "sheet-metal") return "sheet-metal-door";
      if (material === "armored") return "armored-door";
    }
    if (target === "garage-door") {
      return "garage-door";
    }
    if (target === "external-wall") {
      if (material === "wood") return "external-wall-wood";
      if (material === "stone") return "external-wall-stone";
    }
    if (target === "hatch-grill") {
      return "hatch-grill";
    }
    if (target === "other") {
      return "tool-cupboard";
    }
    return null;
  }

  function multiplyResources(costObj, quantity) {
    let result = {};
    for (let key in costObj) {
      if (key === "name") continue;
      result[key] = (costObj[key] || 0) * quantity;
    }
    return result;
  }

  function combineResources(resA, resB) {
    let combined = { ...resA };
    for (let key in resB) {
      combined[key] = (combined[key] || 0) + resB[key];
    }
    return combined;
  }

  function renderResources(resources) {
    const resourceNames = {
      sulfur: "Sulfur",
      gunpowder: "Gunpowder",
      charcoal: "Charcoal",
      metalFragments: "Metal Fragments",
      lowGradeFuel: "Low Grade Fuel",
      pipes: "Metal Pipes",
      cloth: "Cloth",
      techTrash: "Tech Trash",
      rope: "Rope"
    };
    let html = "";
    let hasAny = false;
    for (let key in resources) {
      if (resources[key] > 0 && resourceNames[key]) {
        hasAny = true;
        html += `<li>${resourceNames[key]}: ${resources[key]}</li>`;
      }
    }
    return hasAny ? html : "<li>No specific resource cost data</li>";
  }

  // ----------------------- DOM ELEMENTS -----------------------
  // Basic references:
  const raidTargetSelect = document.getElementById("raid-target");
  const materialTypeSelect = document.getElementById("material-type");
  const raidMethodSelect = document.getElementById("raid-method");
  const calculateBtn = document.getElementById("calculate-btn");
  const resultArea = document.getElementById("result-area");

  // Advanced mode references:
  const addStepBtn = document.getElementById("add-step-btn");
  const raidStepsContainer = document.getElementById("raid-steps");
  const advancedResultArea = document.getElementById("advanced-result");

  // Decay references:
  const toggleDecayBtn = document.getElementById("toggle-decay-btn");
  const decayTrackerDiv = document.getElementById("decay-tracker");
  const startTrackingBtn = document.getElementById("start-tracking-btn");
  const decayStructureSelect = document.getElementById("decay-structure");
  const currentHpInput = document.getElementById("current-hp");
  const trackedItemsUl = document.getElementById("tracked-items");

  // ----------------------- Structure Options Setup -----------------------
  const structureOptions = [
    { value: "wall", text: "Wall" },
    { value: "door", text: "Door" },
    { value: "garage-door", text: "Garage Door" },
    { value: "external-wall", text: "High External Wall" },
    { value: "hatch-grill", text: "Ladder Hatches & Floor Grills" },
    { value: "other", text: "Tool Cupboard" }
  ];
  raidTargetSelect.innerHTML = "";
  structureOptions.forEach(optData => {
    const opt = document.createElement("option");
    opt.value = optData.value;
    opt.text = optData.text;
    raidTargetSelect.appendChild(opt);
  });

  const ALL_MATERIALS = [
    { value: "wood", text: "Wood" },
    { value: "stone", text: "Stone" },
    { value: "sheet-metal", text: "Sheet Metal" },
    { value: "armored", text: "Armored" }
  ];
  const DOOR_MATERIALS = [
    { value: "wood", text: "Wood" },
    { value: "sheet-metal", text: "Sheet Metal" },
    { value: "armored", text: "Armored" }
  ];

  function updateMaterialOptions() {
    const target = raidTargetSelect.value;
    materialTypeSelect.innerHTML = "";
    if (target === "garage-door" || target === "hatch-grill" || target === "other") {
      const opt = document.createElement("option");
      opt.value = "default";
      if (target === "hatch-grill") {
        opt.text = "Default";
      } else if (target === "other") {
        opt.text = "Tool Cupboard";
      } else {
        opt.text = "Sheet Metal";
      }
      materialTypeSelect.appendChild(opt);
      materialTypeSelect.disabled = true;
    } else if (target === "door") {
      DOOR_MATERIALS.forEach(mat => {
        const opt = document.createElement("option");
        opt.value = mat.value;
        opt.text = mat.text;
        materialTypeSelect.appendChild(opt);
      });
      materialTypeSelect.disabled = false;
    } else if (target === "external-wall") {
      [{ value: "wood", text: "Wood" }, { value: "stone", text: "Stone" }]
        .forEach(mat => {
          const opt = document.createElement("option");
          opt.value = mat.value;
          opt.text = mat.text;
          materialTypeSelect.appendChild(opt);
        });
      materialTypeSelect.disabled = false;
    } else {
      ALL_MATERIALS.forEach(mat => {
        const opt = document.createElement("option");
        opt.value = mat.value;
        opt.text = mat.text;
        materialTypeSelect.appendChild(opt);
      });
      materialTypeSelect.disabled = false;
    }
  }
  raidTargetSelect.addEventListener("change", updateMaterialOptions);
  updateMaterialOptions();

  // ----------------------- Method Options Setup -----------------------
  const methodOptions = [
    { value: "fireArrow", text: "Fire Arrow" },
    { value: "handmadeShell", text: "Handmade Shell" },
    { value: "buckshot", text: "Buckshot" },
    { value: "incendiaryShell", text: "Incendiary Shell" },
    { value: "flamethrower", text: "Flamethrower" },
    { value: "militaryFlamethrower", text: "Military Flamethrower" },
    { value: "molotov", text: "Molotov" },
    { value: "beancan", text: "Beancan Grenade" },
    { value: "f1", text: "F1 Grenade" },
    { value: "satchel", text: "Satchel Charge" },
    { value: "explosiveAmmo", text: "Explosive Ammo" },
    { value: "rocket", text: "Rocket" },
    { value: "incendiaryRocket", text: "Incendiary Rocket" },
    { value: "hvRocket", text: "High Velocity Rocket" },
    { value: "c4", text: "C4" },
    { value: "heGrenade", text: "HE Grenade" }
  ];
  raidMethodSelect.innerHTML = "";
  methodOptions.forEach(m => {
    const opt = document.createElement("option");
    opt.value = m.value;
    opt.text = m.text;
    raidMethodSelect.appendChild(opt);
  });

  // ----------------------- Casual Calculation -----------------------
  calculateBtn.addEventListener("click", () => {
    const target = raidTargetSelect.value;
    const material = materialTypeSelect.value;
    const method = raidMethodSelect.value;
    const amount = parseInt(document.getElementById("amount-standard").value) || 1;

    const structureKey = getStructureKey(target, material);
    if (!structureKey) {
      resultArea.innerHTML = `<p style="color: red;">Error: Invalid structure/material combination.</p>`;
      console.error("Invalid combination:", target, material);
      return;
    }
    if (!RAID_DATA[structureKey]) {
      resultArea.innerHTML = `<p style="color: red;">Error: No data for ${structureKey}.</p>`;
      console.error("No data for:", structureKey);
      return;
    }
    const methKey = methodKeyMapping[method];
    if (!methKey || RAID_DATA[structureKey][methKey] === undefined) {
      resultArea.innerHTML = `<p style="color: red;">Error: No data for method "${method}" on ${structureKey}.</p>`;
      console.error("No method data:", method, structureKey);
      return;
    }

    const baseQty = RAID_DATA[structureKey][methKey];
    const totalQty = baseQty * amount;
    const cost = ITEM_COSTS[method];
    const resources = multiplyResources(cost, totalQty);

    const structureText = raidTargetSelect.options[raidTargetSelect.selectedIndex].text;
    const matText = material !== "default" ? `(${material})` : "";
    const methodText = raidMethodSelect.options[raidMethodSelect.selectedIndex].text;

    resultArea.innerHTML = `
      <h3>Raid Calculation</h3>
      <p><strong>Structure:</strong> ${structureText} ${matText}</p>
      <p><strong>Method:</strong> ${methodText}</p>
      <p><strong>Amount:</strong> ${amount}</p>
      <p><strong>Total Explosives Needed:</strong> ${totalQty}</p>
      <p><strong>Resources Required to Craft:</strong></p>
      <ul>${renderResources(resources)}</ul>
    `;
  });

  // ----------------------- Advanced Mode Functions -----------------------
  addStepBtn.addEventListener("click", () => {
    const stepElement = document.createElement("div");
    stepElement.className = "raid-step";
    // Added an "Amount" input to specify how many of this step
    stepElement.innerHTML = `
      <label>Structure:
        <select class="step-target">
          <option value="wall">Wall</option>
          <option value="door">Door</option>
          <option value="garage-door">Garage Door</option>
          <option value="external-wall">High External Wall</option>
          <option value="hatch-grill">Ladder Hatches & Floor Grills</option>
          <option value="other">Tool Cupboard</option>
        </select>
      </label>
      <label>Material:
        <select class="step-material"></select>
      </label>
      <label>Method:
        <select class="step-method">
          <option value="fireArrow">Fire Arrow</option>
          <option value="handmadeShell">Handmade Shell</option>
          <option value="buckshot">Buckshot</option>
          <option value="incendiaryShell">Incendiary Shell</option>
          <option value="flamethrower">Flamethrower</option>
          <option value="militaryFlamethrower">Military Flamethrower</option>
          <option value="molotov">Molotov</option>
          <option value="beancan">Beancan Grenade</option>
          <option value="f1">F1 Grenade</option>
          <option value="satchel">Satchel Charge</option>
          <option value="explosiveAmmo">Explosive Ammo</option>
          <option value="rocket">Rocket</option>
          <option value="incendiaryRocket">Incendiary Rocket</option>
          <option value="hvRocket">High Velocity Rocket</option>
          <option value="c4">C4</option>
          <option value="heGrenade">HE Grenade</option>
        </select>
      </label>
      <label>Amount:
        <input type="number" class="step-amount" min="1" value="1">
      </label>
      <button class="remove-step-btn">Remove Step</button>
    `;
    const stepTargetSelect = stepElement.querySelector(".step-target");
    const stepMaterialSelect = stepElement.querySelector(".step-material");

    function updateStepMaterials() {
      const tgt = stepTargetSelect.value;
      stepMaterialSelect.innerHTML = "";
      if (tgt === "garage-door" || tgt === "hatch-grill" || tgt === "other") {
        const opt = document.createElement("option");
        opt.value = "default";
        if (tgt === "hatch-grill") {
          opt.text = "Default";
        } else if (tgt === "other") {
          opt.text = "Tool Cupboard";
        } else {
          opt.text = "Sheet Metal";
        }
        stepMaterialSelect.appendChild(opt);
        stepMaterialSelect.disabled = true;
      } else if (tgt === "door") {
        DOOR_MATERIALS.forEach(mat => {
          const opt = document.createElement("option");
          opt.value = mat.value;
          opt.text = mat.text;
          stepMaterialSelect.appendChild(opt);
        });
        stepMaterialSelect.disabled = false;
      } else if (tgt === "external-wall") {
        [{ value: "wood", text: "Wood" }, { value: "stone", text: "Stone" }]
          .forEach(mat => {
            const opt = document.createElement("option");
            opt.value = mat.value;
            opt.text = mat.text;
            stepMaterialSelect.appendChild(opt);
          });
        stepMaterialSelect.disabled = false;
      } else {
        ALL_MATERIALS.forEach(mat => {
          const opt = document.createElement("option");
          opt.value = mat.value;
          opt.text = mat.text;
          stepMaterialSelect.appendChild(opt);
        });
        stepMaterialSelect.disabled = false;
      }
    }
    stepTargetSelect.addEventListener("change", updateStepMaterials);
    updateStepMaterials();

    // Remove this step if user clicks "Remove Step"
    stepElement.querySelector(".remove-step-btn").addEventListener("click", () => {
      raidStepsContainer.removeChild(stepElement);
      updateAdvancedPlan();
    });

    // Append the new step and refresh the advanced plan
    raidStepsContainer.appendChild(stepElement);
    updateAdvancedPlan();
  });

  function updateAdvancedPlan() {
    const stepElements = document.querySelectorAll(".raid-step");
    let totalResources = {};
    let planText = "";
    stepElements.forEach((step, index) => {
      const tgt = step.querySelector(".step-target").value;
      const mat = step.querySelector(".step-material").value;
      const meth = step.querySelector(".step-method").value;
      const amount = parseInt(step.querySelector(".step-amount").value) || 1;

      const structureKey = getStructureKey(tgt, mat);
      if (!structureKey || !RAID_DATA[structureKey]) {
        planText += `<p style="color:red;">Step ${index + 1}: Invalid combination.</p>`;
        return;
      }
      const methKey = methodKeyMapping[meth];
      const baseQty = RAID_DATA[structureKey][methKey] || 0;
      const totalQty = baseQty * amount;
      planText += `<p>Step ${index + 1}: ${tgt} ${mat !== "default" ? "(" + mat + ")" : ""} with ${meth} → Base: ${baseQty} x ${amount} = <strong>${totalQty}</strong></p>`;
      const cost = multiplyResources(ITEM_COSTS[meth], totalQty);
      totalResources = combineResources(totalResources, cost);
    });

    advancedResultArea.innerHTML = `
      <h3>Total Advanced Raid Plan:</h3>
      ${planText}
      <p><strong>Total Resources Required to Craft:</strong></p>
      <ul>${renderResources(totalResources)}</ul>
    `;
  }

  // ----------------------- Decay Tracker Functions -----------------------
  toggleDecayBtn.addEventListener("click", () => {
    decayTrackerDiv.classList.toggle("hidden");
  });

  startTrackingBtn.addEventListener("click", () => {
    const structure = decayStructureSelect.value;
    const currentHp = parseInt(currentHpInput.value);
    if (!currentHp || currentHp < 1) {
      alert("Please enter a valid HP.");
      return;
    }
    // Send a message to background.js to start tracking decay
    chrome.runtime.sendMessage({ action: "trackDecay", structure: structure, hp: currentHp });
  });

  function updateDecayUI(trackedStructures) {
    trackedItemsUl.innerHTML = "";
    trackedStructures.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.structure} - HP: ${item.hp}
        <button class="remove-decay" data-structure="${item.structure}">❌</button>
      `;
      trackedItemsUl.appendChild(li);
    });
    document.querySelectorAll(".remove-decay").forEach(btn => {
      btn.addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "removeDecay", structure: btn.dataset.structure });
      });
    });
  }

  // Listen for messages from background.js (e.g., decay updates)
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "updateDecay") {
      updateDecayUI(message.trackedStructures);
    }
  });
});
