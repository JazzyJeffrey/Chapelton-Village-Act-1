const showInventoryButton = document.getElementById("showInventoryButton");
const closeInventoryButton = document.getElementById("closeInventoryButton");
const inventoryWindow = document.getElementById("inventory");
const playerSheet = document.getElementById("playerStats");
const showPlayerSheetButton = document.getElementById("showPlayerStatsButton");
const closePlayerSheetButton = document.getElementById("closePlayerStatsButton");

class items {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
    addItemToTinventory() {
        inventory.push(this.name);
    }
}

class weapon extends items {
    constructor(name, type, power, specialAbility) {
        super(name, type);
        this.power = power;
        this.specialAbility = specialAbility;
    }

    equipWeapon() {
        this.name = `EQ  ${this.name}`
        
    }
}

class armor extends items {
    constructor(name, type, defense){
        super(name, type);
        this.defense = defense;
    }

    equipArmor() {

    }
}

class consumable extends items {
    constructor(name, type, usage){
        super(name, type);
        this.usage = usage;
    }

    useItem() {

    }
}


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
        inventory.forEach(elements => {
            const inventoryItem = document.createElement("li"); 
            inventoryItem.textContent = elements;
            currentInventory.appendChild(inventoryItem); 
        });
    } else {
        currentInventory.innerHTML = ("Your inventory is empty.")
    };
};


    initalizewEventListeners();
    




