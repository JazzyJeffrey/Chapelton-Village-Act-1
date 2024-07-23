const showInventoryButton = document.getElementById("showInventoryButton");
const equipWeaponButton = document.getElementById("equipWeapon");
const closeInventoryButton = document.getElementById("closeInventoryButton");
const inventoryWindow = document.getElementById("inventory");
const playerSheet = document.getElementById("playerStats");
const showPlayerSheetButton = document.getElementById("showPlayerStatsButton");
const closePlayerSheetButton = document.getElementById("closePlayerStatsButton");
const strengthText = document.getElementById("strengthText");
const testingButton = document.getElementById("button6");
const testingButton2 = document.getElementById("button5");
let inventory = [];

function initalizewEventListeners() {

    showInventoryButton.addEventListener("click", () => {
        showInventory();
        inventoryWindow.showModal();
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




function showInventory() {
    const currentInventory = document.getElementById("currentInventory");
    currentInventory.innerHTML = "";
    if(inventory.length >= 1) {
        inventory.forEach(item => {
            const inventoryItem = document.createElement("li"); 
            inventoryItem.textContent = item.name;
            currentInventory.appendChild(inventoryItem); 
        });
    } else {
        currentInventory.innerHTML = ("Your inventory is empty.")
    };
};


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
  
  // Function to add an item to the inventory array and update the display
  function addItemToInventory(item) {
    inventory.push(item);
  }
  
  testingButton2.addEventListener("click", () => {
    addItemToInventory();
  });
   

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


testingButton.addEventListener("click", () => {
    useItem(player, 1);
    console.log(player.hp);
})
