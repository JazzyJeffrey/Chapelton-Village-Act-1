// Constant global variables for controlling the HTML 
const showInventoryButton = document.getElementById("showInventoryButton");
const equipWeaponButton = document.getElementById("equipWeapon");
const equipArnorButton = document.getElementById("equipArmor");
const useHealthPotionButton = document.getElementById("useHealthPotion");
const useMagicPotionButton = document.getElementById("useMagicPotion");
const closeInventoryButton = document.getElementById("closeInventoryButton");
const inventoryWindow = document.getElementById("inventory");
const playerSheet = document.getElementById("playerStats");
const showPlayerSheetButton = document.getElementById("showPlayerStatsButton");
const closePlayerSheetButton = document.getElementById("closePlayerStatsButton");
const strengthText = document.getElementById("strengthText");
const testingButton = document.getElementById("button6");
const testingButton2 = document.getElementById("button5");

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

// Intialize inventory array
let inventory = [];


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

// Player Character
const player = {
  xp: 0,
  level: 1,
  hp: 100,
  mp: 100,
  strength: 1,
  constitution: 1,
  intellingence: 1,
  luck: 1,
  gold: 0,
  currentWeapon: 0

}



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

// Function to add an item to the inventory array
async function addItemToInventory(inventory, itemId) {
  const item = await fetchItemById(itemId);
  inventory.push(item);
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

// Testing inventory functions
testingButton.addEventListener("click", async () => {
   await addItemToInventory(inventory, 1);
  console.log(player.hp);
})

// Function for health potion
function useHealthPotion() {
  if (inventory.includes(fetchItemById(1))) {
    useItem(player, 1);
  } else {
    alert(`You don't have any Health Potions in your inventory.`)
  };
}

// Function for magic potion
function useMagicPotion() {
  if (inventory.includes(fetchItemById(2))) {
    useItem(player, 2);
  } else {
    alert(`You don't have any Magic Potions in your inventory.`)
  };
}
