const showInventoryButton = document.getElementById("showInventoryButton");
const closeInventoryButton = document.getElementById("closeInventoryButton");
const inventoryWindow = document.getElementById("inventory");
const playerSheet = document.getElementById("playerStats");
const showPlayerSheetButton = document.getElementById("showPlayerStatsButton");
const closePlayerSheetButton = document.getElementById("closePlayerStatsButton");
let inventory = [];


function initalizewEventListeners() {

    showInventoryButton.addEventListener("click", () => {
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
    if(inventory.length >= 1) {
        inventory.forEach(element => {
            const inventoryItem = document.createElement("li"); 
            inventoryItem.textContent = element;
            currentInventory.appendChild(inventoryItem); 
        });
    } else {
        currentInventory.innerHTML = ("Your inventory is empty.")
    };
};


    initalizewEventListeners();
    showInventory();


    