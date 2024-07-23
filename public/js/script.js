// Stats and inventory variables
let xp = 0;
let level = 1;
let hp = 100;
let mp = 100;
let strength = 1;
let constitution = 1;
let intellingence = 1;
let luck = 1;
let gold = 0;
let currentWeapon = 0;
let fighting;
let currentMonsterHealth;
let inventory = [luckyCoin];
let activateSecretEntrance = false;

// Lucky Coin Variable
const luckyCoin = new Consumable("Lucky Coin", "Unique", throwLuckyCoin()); 

function throwLuckyCoin() {
    if(inventory.includes(luckyCoin)) {
        inventory.pop(luckyCoin);
        luck += 1;
        text.innerHTML = "You make a wish and throw your lucky coin into the dry fountain. Though there isn't any water flowing inside, you still hear the sound of a splash."
        activateSecretEntrance = true;
    } else {
        text.innerHTML = "Digging through your pockets, you don't have your lucky coin on you anymore. Did you already toss it into the fountain, or did you drop it somewhere?"
    }
}

// Interactive button and text area variables
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const button5 = document.querySelector("#button5");
const button6 = document.querySelector("#button6");
const text = document.querySelector("#text");
const levelText = document.querySelector("#levelText");
const healthText = document.querySelector("#healthText");
const magicPointsText = document.querySelector("#mpText");
const currentCharacterName = document.querySelector("#currentCharacterText");
const goldText = document.querySelector("#goldText")
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// Weapons Arrays
const daggers = [
    {name: "Broken Dagger" , power: 1, specialAbility: "none"},
    {name: "Wooden Dagger" , power: 3, specialAbility: "none"},
    {name: "Bronze Dagger", power: 5, specialAbility: "none"},
    {name: "Iron Dagger", power: 10, specialAbility: "none"},
    {name: "Steel Dagger", power: 15, specialAbility: "none"},
    {name: "Mithril Dagger", power: 20, specialAbility: "none"},
    {name: "Obsidian Dagger", power: 25, specialAbility: "none"},
    {name: "Ethriel's Dagger", power: 50, specialAbility: "Allows the use of the Sneak Attack ability"}
];
const swords = [
    {name: "Broken Sword", power: 5, specialAbility: "none"},
    {name: "Wooden Sword", power: 10, specialAbility: "none"},
    {name: "Bronze Sword", power: 20, specialAbility: "none"},
    {name: "Iron Sword", power: 25, specialAbility: "none"},
    {name: "Steel Sword", power: 35, specialAbility: "none"},
    {name: "Mithril Sword", power: 45, specialAbility: "none"},
    {name: "Obsidian Sword", power: 55, specialAbility: "none"},
    {name: "The Sword of Babel", power: 75, specialAbility: "Allows the use of one other random special ability"}    
];
const axes = [
    {name: "Broken Axe", power: 5, specialAbility: "none"},
    {name: "Wooden Axe", power: 10, specialAbility: "none"},
    {name: "Bronze Axe", power: 15, specialAbility: "none"},
    {name: "Iron Axe", power: 20, specialAbility: "none"},
    {name: "Steel Axe", power: 30, specialAbility: "none"},
    {name: "Mithril Axe", power: 40, specialAbility: "none"},
    {name: "Obsidian Axe", power: 50, specialAbility: "none"},
    {name: "Executioner's Axe", power: 80, specialAbility: "Allows a 2x Bleed effect to take effect randomly"}
];

// Armor arrays
const shields = [
    {name: "Rusted Shield", defense: 1},
    {name: "Wooden Shield", defense: 2},
    {name: "Bronze Shield", defense: 3},
    {name: "Iron Shield", defense: 4},
    {name: "Steel Shield", defense: 5},
    {name: "Mithril Shield", defense: 6},
    {name: "Obsidian Shield", defense: 7},
    {name: "Shield of Enlightenment", defense: 10}
];
const armor = [
    {name: "Torn Leather", defense: 1},
    {name: "Leather Armor", defense: 2},
    {name: "Bronze Armor", defense: 3},
    {name: "Iron Armor", defense: 4},
    {name: "Steel Armor", defense: 5},
    {name: "Mithril Armor", defense: 6},
    {name: "Obsidian Armor", defense: 7},
    {name: "Magic Knight's Armor", defense: 10}
];

// Item shop array
const items = [
    {name: "Health Potion", description: "Use to increase health by 10-20 hp", use: function healthPotion() {hp += (Math.floor(Math.random() * (20 - 10 + 1) + 10))}},
    {name: "Magic Potion", description: "Use to increase magic by 10-20 mp", use: function magicPotion() {mp += (Math.floor(Math.random() * (20 - 10 + 1) + 10))}},
    {name: "Mystery Box", description: "The potions are potions but the mystery box could be anything, it could even be a potion!"}
];

// Monsters Array
const monster = [
    {name: "Bat", level: 1, health: 5},
    {name: "Wolf", level: 3, health: 10},
    {name: "Toxic Ooze", level: 5, health: 20},
    {name: "Dire Wolf", level: 8, health: 25},
    {name: "Lost Spirit", level: 10, health: 35},
    {name: "Evil Clown", level: 15, health: 50},
    {name: "Vampire", level: 17, health: 50},
    {name: "Lych", level: 20, health: 75},
    {name: "Bone Dragon", level: 25, health: 100}
];

// Boss Monster Array
const bossMonsters = [
    {name: "Vampire Bat Cow", level: 4, health: 15},
    {name: "Jarkath, The Terrible Mayor", level: 12, health: 30},
    {name: "King Fucknut McBoob", level: 18, health: 65},
    {name: "The Demon King, Camaross", level: 30, health: 200}
];

// Locations Array
const locations = [
    {
        name: "Quieton Village",
        "button text": ["Go to Flying Lion Inn", "Go to Baelthor's Armory", "Go to Frizzle's General Store", "Check Inventory", "Return to village", "Talk to the creepy old man"],
        "button functions": [goToInn, goToArmory, goToStore, checkInventory, goToVillage, talkToWiseman],
        text: "Back in the center of the village, you're crippled with the sense of emptiness and dread as you stand alone, by the fountain, with the creepy old man"
    },
    {
        name: "Flying Lion Inn",
        "button text": ["Order food and drink(5 gp)", "Get a room for the night(10 gp)", "Talk to the barkeep for information", "Check inventory"],
        "button functions": [],
        text: "The air inside the inn is thick with scent of mead and sorrow. As you peer through a haze of pipe smoke you see the tables are all empty and nota soul is here except the barkeep standing, staring mournfully at the empty bar. You move and take a seat in front of the barkeep."
    },
    {
        name: "Baelthor's Armory",
        "button text": ["Make a purchase", "Sell something from your inventroy", "Talk to the blacksmith for information", "Check inventory"],
        "button functions": [],
        text: `As you move through the desolate town toward the armory, you hear the loud clang of a hammer striking an anvil with ferocity. Upon entering the armory you see the walls are bare but for a few rusty weapons. The large bear of man striking the anvil see you and yells, "Welcome! I am Baelthor the blacksmith. We don't get many vistors here in Quieton, What could an old blacksmith do for you?"`
    },
    {
        name: "Frizzle's General Store",
        "button text": ["Make a purchase", "Sell something from your inventory", "Talk to the shopkeep for information", "Check inventory"],
        "button functions": [],
        text: ``
    },
    {
        name: "Creepy Old Man",
        "button text": ["Accept his gift", "Reject his gift", "Question the old man's motives", "Check inventory", "Return to Village", "Throw your Lucky Coin in the fountain"],
        "button functions": [acceptGift, , , checkInventory, goToVillage, ],
        text: `A bone chilling feeling of death overcomes you as you step closer to the old man. "Alone? It can be very dangerous for one travel around these lands by their self. Here take this."`
    },
    {
        name: "Inventory",
        "button text": ["Use a health potion", "Use a magic potion", "Equip a weapon", "Equip Armor", "Use the mystery box", "Close inventory"],
        "button functions": [useHealthPotion, useMagicPotion, , , ,goToVillage],
        text: inventory
    },
    {
        name: "The Found Woods",
        "button text": ["Go deeper into the woods", "Investigate the immediate area", "Turn around and go back the way you came", "Check Inventory"],
        "button functions": [],
        text: "You make haste for The Found Woods. The rich smells of plant life fills your nose as the sunlight starts to slowly fade under the dense canopy. As you move deeper into the forest you realize the path behind you has disappeared in the brush."
    }
];

// Initalize Buttons
button1.onclick = goToInn;
button2.onclick = goToArmory;
button3.onclick = goToStore;
button4.onclick = checkInventory;
button5.onclick = goToVillage;
button6.onclick = talkToWiseman;


// Update function for buttons
function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button4.innerText = location["button text"][3];
    button5.innerText = location["button text"][4];
    button6.innerText = location["button text"][5];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    button4.onclick = location["button functions"][3];
    button5.onclick = location["button functions"][4];
    button6.onclick = location["button functions"][5];
    text.innerHTML = location.text;
};

// Start game function
function startGame() {
    goToVillage();
};

// Check Inventory function
function checkInventory() {
    update(locations[5]);
};

// Village Square functions
function goToVillage() {
    update(locations[0]);
};

function goToInn() {
    update(locations[1]);
};

function goToArmory() {
    update(locations[2]);
};

function goToStore() {
    update(locations[3]);
};


// Creepy old man functions
function talkToWiseman() {
    update(locations[4]);
};

function acceptGift() {
    text.innerHTML = `As you take the gold and itmes from the old man, you feel a sense of warmth. The first calmness you've felt since you arrived in this wretched place. Just as you finish getting all the items put away the old man starts to slowly disapper. "Remember, in this place, all you have is hope." whispers the old man as he fades into a thick mist and vanishes.`
    gold += 10;
    inventory.push(shields[1].name);
    inventory.push(daggers[1].name);
    goldText.innerText = gold;
};

// Inventory and Equip functions

function useHealthPotion() {
    if (inventory.includes(items[0])) {
        items[0].use;
    } else {
        window.alert("You do not have any health potions")
    };
};

function useMagicPotion() {
    if (inventory.includes(items[1])) {
        items[1].use;
    } else {
        window.alert("You do not have any magic potions")
    };
};


// Lucky Coin Statement
if (inventory.includes("Lucky Coin")) {
    luck += 1;
} else {
    luck = luck;
}
