const {
    spawner_name
} = require("config");

module.exports = (type) => {
    var cur = 0;
    var cap = 0;
    if(type == 'spawn' || type == null) {
        cur += Game.spawns[spawner_name].room.energyAvailable;
        cap += Game.spawns[spawner_name].room.energyCapacityAvailable;
    }
    if(type == 'tower' || type == null) {
        const towers = Game.spawns[spawner_name].room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_TOWER }
        });
        for(name in towers) {
            cur += towers[name].energy;
            cap += towers[name].energyCapacity;
        }
    }
    return 100 * cur/cap;
}
