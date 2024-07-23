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

// Function to get random number
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

// Function to use item
async function useItem(player, itemId) {
    const item = await getItemById(itemId);
  
    if (item.stat_boost) {
      const boosts = item.stat_boost;
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

})
