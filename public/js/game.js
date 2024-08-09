const { getEnemyById } = require("../../src/db");

// Constant global variables for controlling the HTML 
const showInventoryButton = document.getElementById("showInventoryButton");
const equipWeaponButton = document.getElementById("equipWeapon");
const equipArmorButton = document.getElementById("equipArmor");
const useHealthPotionButton = document.getElementById("useHealthPotion");
const useMagicPotionButton = document.getElementById("useMagicPotion");
const closeInventoryButton = document.getElementById("closeInventoryButton");
const inventoryWindow = document.getElementById("inventory");
const playerSheet = document.getElementById("playerStats");
const showPlayerSheetButton = document.getElementById("showPlayerStatsButton");
const closePlayerSheetButton = document.getElementById("closePlayerStatsButton");
const strengthText = document.getElementById("strengthText");
const healthText = document.querySelector("#healthText");
const magicPointsText = document.querySelector("#mpText");
const defenseText = document.getElementById("defenseText");

// Function to initalize modal dialog window buttons
function initalizewEventListeners() {

  showInventoryButton.addEventListener("click", () => {
    updateInventory();
    inventoryWindow.showModal();
  });

  useHealthPotionButton.addEventListener("click", () => {
    useHealthPotion();
  });

  useMagicPotionButton.addEventListener("click", () => {
    useMagicPotion();
  });

  equipWeaponButton.addEventListener("click", async () => {
    await equipWeapon(player, weaponId);
  });

  equipArmorButton.addEventListener("click", async () => {
    await equipArmor(player, 2)
  })

  closeInventoryButton.addEventListener("click", () => {
    inventoryWindow.close();
  });



  showPlayerSheetButton.addEventListener("click", () => {
    playerSheet.showModal();
  });

  closePlayerSheetButton.addEventListener("click", () => {
    playerSheet.close();
  });

};




// Function to update/show the items in the inventory menu 
function updateInventory() {
  const currentInventory = document.getElementById("currentInventory");
  currentInventory.innerHTML = "";
  if (inventory.length >= 1) {
    inventory.forEach(item => {
      const inventoryItem = document.createElement("li");
      inventoryItem.textContent = item.name;
      currentInventory.appendChild(inventoryItem);
    });
  } else {
    currentInventory.innerHTML = ("Your inventory is empty.")
  };
};

// Intialize all the button functionality 
initalizewEventListeners();

// Function to calcultate player attack power
function calculatePlayerAttack(strength) {
  const minAttack = strength;
  const maxAttack = strength * 2;
  const attack = Math.floor(Math.random() * (maxAttack - minAttack + 1)) + minAttack;
  return attack;
}

// Player Character
const player = {
  xp: 0,
  level: 1,
  hp: 100,
  mp: 100,
  strength: 1,
  constitution: 1,
  intelligence: 1,
  luck: 1,
  gold: 0,
  attack: calculatePlayerAttack(this.strength),
  defense: 1,
}
// Intialize inventory array
let inventory = [];


// Function to fetch an item from the server
async function fetchItemById(itemId) {
  try {
    const response = await fetch(`/api/items/${itemId}`);
    if (response.ok) {
      const item = await response.json();
      return item;
    } else {
      console.error('Failed to fetch item:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching item:', error);
    return null;
  }
}

async function fetchWeaponById(weaponId) {
  console.log('Fetching weapon with id:', weaponId);
  try {
    const response = await fetch(`/api/weapons/${weaponId}`);
    if (response.ok) {
      const weapon = await response.json();
      return weapon;
    } else {
      console.error('Failed to fetch weapon:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching weapon:', error);
    return null;
  }
}

async function fetchArmorById(armorId) {
  try {
    const response = await fetch(`api/armor/${armorId}`);
    if (response.ok) {
      const armor = await response.json();
      return armor;
    } else {
      console.error('Failed to fetch armor:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching armor:', error);
    return null;
  }
}

async function fetchEnemyById(enemyId) {
  try {
    const response = await fetch(`api/enemies/${enemyId}`);
    if (response.ok) {
      const enemy = await response.json();
      return enemy;
    } else {
      console.error('Failed to fetch armor:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching armor:', error);
    return null;
  }
}

// Function to add an item to the inventory array
async function addItemToInventory(inventory, itemId) {
  const item = await fetchItemById(itemId);
  inventory.push(item);
  console.log(inventory)
}

async function addWeaponToInventory(inventory, weaponId) {
  const weapon = await fetchWeaponById(weaponId);
  inventory.push(weapon);
  console.log(inventory)
}

async function addArmorToInventory(inventory, armorId) {
  const armor = await fetchArmorById(armorId);
  inventory.push(armor);
  console.log(inventory)
}

// Function to get random number
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to use item
async function useItem(player, itemId) {
  const item = await fetchItemById(itemId);
  console.log(item);
  if (item.stat_boosts) {
    const boosts = item.stat_boosts;
    for (let stat in boosts) {
      if (player[stat] !== undefined) {
        if (typeof boosts[stat] === 'object' && boosts[stat].min !== undefined && boosts[stat].max !== undefined) {
          const randomBoost = getRandomInt(boosts[stat].min, boosts[stat].max);
          player[stat] += randomBoost;
          console.log(`Used ${item.name}. ${stat} increased by ${randomBoost}.`);
        } else {
          player[stat] += boosts[stat];
          console.log(`Used ${item.name}. ${stat} increased by ${boosts[stat]}.`);
        }
      }
    }
  }
};

// Equip weapons and armor from inventory (subject to change)
async function equipWeapon(player, weaponId) {
  const weapon = await fetchWeaponById(weaponId);
  console.log(weapon);
  const weaponPower = weapon.power;
  player.strength += weaponPower;
  strengthText.textContent = player.strength;
}

async function equipArmor(player, armorId) {
  const armor = await fetchArmorById(armorId);
  const defenseRating = armor.defense;
  player.defense += defenseRating;
  defenseText.textContent = player.defense;
}



// Function for health potion
async function useHealthPotion() {
  const healthPotionId = 1;
  const healthPotion = await fetchItemById(healthPotionId);

  if (!healthPotion) {
    alert(`Failed to fetch Health Potion from the server.`);
    return;
  }

  // Find the first occurrence of the magic potion in the inventory
  const itemIndex = inventory.findIndex(item => item.id === healthPotionId);

  if (itemIndex !== -1) {
    // Use the item and remove it from the inventory
    await useItem(player, healthPotionId);
    inventory.splice(itemIndex, 1);
    updateInventory(inventory); // Update the inventory display
    healthText.textContent = player.hp; // Update the hp display

  } else {
    alert(`You don't have any Health Potions in your inventory.`);
  }
}

// Function for magic potion
async function useMagicPotion() {
  const magicPotionId = 2;
  const magicPotion = await fetchItemById(magicPotionId);
  if (!magicPotion) {
    alert(`Failed to fetch Magic Potion from the server.`)
    return;
  }

  // Find the first occurrence of the magic potion in the inventory
  const itemIndex = inventory.findIndex(item => item.id === magicPotionId);

  if (itemIndex !== -1) {
    // Use the item and remove it from the inventory
    await useItem(player, magicPotionId);
    inventory.splice(itemIndex, 1);
    updateInventory(inventory); // Update the inventory display
    magicPointsText.textContent = player.mp;
  } else {
    alert(`You don't have any Magic Potions in your inventory.`);
  }
}

// Character Name from local storage
const currentCharacterName = document.querySelector("#currentCharacterText");

const characterName = localStorage.getItem('characterName');
if (characterName) {
  currentCharacterName.textContent = characterName;
} else {
  window.location.href = 'login.html'; // Redirect back to login if no name found
}

// Testing inventory functions (Reverse order for button functions)
const testingButton = document.getElementById("button6");
const testingButton2 = document.getElementById("button5");
const testingButton3 = document.getElementById("button4");
const testingButton4 = document.getElementById("button3");

testingButton.addEventListener("click", async () => {
  await addItemToInventory(inventory, 1);
  console.log(player.hp);
})

testingButton2.addEventListener("click", async () => {
  await addItemToInventory(inventory, 2);
  console.log(player.mp);
})

testingButton3.addEventListener("click", async () => {
  await addWeaponToInventory(inventory, 2);
  console.log(inventory);
})

testingButton4.addEventListener("click", async () => {
  await addArmorToInventory(inventory, 2);
  console.log(inventory);
})




