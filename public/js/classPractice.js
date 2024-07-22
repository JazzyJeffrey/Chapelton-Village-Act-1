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

let strength = 1;

class Items {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
    addItemToTinventory(inventory) {
        inventory.push(this);
    }
}

class Weapon extends Items {
    constructor(name, type, power, specialAbility) {
        super(name, type);
        this.power = power;
        this.specialAbility = specialAbility;
    }

    equipWeapon() {
        this.name = `EQ  ${this.name}`;
        strength += this.power;
        strengthText.innerText = strength;   
    }
}

class Armor extends Items {
    constructor(name, type, defense){
        super(name, type);
        this.defense = defense;
    }

    equipArmor() {

    }
}

class Consumable extends Items {
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
    

const healthPotion = new Consumable("Health Potion", "Potion", "Restore 10-20 HP");    
const woodenDagger = new Weapon("Wooden Dagger", "Weapon", 3, "none");

testingButton.addEventListener("click", () => {
    woodenDagger.addItemToTinventory(inventory);
    console.log(inventory);
});

testingButton2.addEventListener("click", () => {
    healthPotion.addItemToTinventory(inventory);
    console.log(inventory);
})

equipWeaponButton.addEventListener("click", () => {
    woodenDagger.equipWeapon(inventory);
    console.log(strength);
})

