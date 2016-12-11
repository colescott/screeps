const getEnergy = require("util.percent_energy");
const countCreeps = require("util.count_creeps");
const set = countCreeps('worker')/5;

module.exports = () => {
    const energy = getEnergy();
    for(name in Game.creeps) {
        if(Game.creeps[name].memory.type == 'worker') {
            const creep = Game.creeps[name];
            const id = creep.memory.id;
            const isTarget = creep.room.find(FIND_CONSTRUCTION_SITES)[ 0 ];
            if(energy >= 80) {
                if(id < set) {
                    creep.memory.role = 'harvester';
                } else {
                    if(isTarget) {
                        creep.memory.role = 'builder';
                    } else {
                        creep.memory.role = 'upgrader';
                    }
                }
            } else if(energy >= 60) {
                if(id < 2 * set) {
                    creep.memory.role = 'harvester';
                } else {
                    if(isTarget) {
                        creep.memory.role = 'builder';
                    } else {
                        creep.memory.role = 'upgrader';
                    }
                }
            } else if(energy >= 40) {
                if(id < 3 * set) {
                    creep.memory.role = 'harvester';
                } else {
                    if(isTarget) {
                        creep.memory.role = 'builder';
                    } else {
                        creep.memory.role = 'upgrader';
                    }
                }
            } else if(energy >= 20) {
                if(id < 4 * set) {
                    creep.memory.role = 'harvester';
                } else {
                    if(isTarget) {
                        creep.memory.role = 'builder';
                    } else {
                        creep.memory.role = 'upgrader';
                    }
                }
            } else {
                creep.memory.role = 'harvester';
            }
        }
    }
}
