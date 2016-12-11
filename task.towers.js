const config = require("config");

const {
    spawner_name,
    wallTarget
} = config;

module.exports = () => {
    var towers = Game.spawns[ spawner_name ].room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });

    var hostiles = Game.spawns[ spawner_name ].room.find(FIND_HOSTILE_CREEPS);
    if (hostiles.length > 0) {
        towers.forEach(tower => tower.attack(hostiles[ 0 ]));
    } else {
        towers.forEach(tower => {
            const structures = tower.room.find(FIND_STRUCTURES);
            const creeps = Game.creeps;
            for(let index in creeps) {
                let creep = Game.creeps[ index ];
                if(creep.hits < creep.hitsMax) {
                    tower.heal(creep);
                }
            }
            for(let index in structures) {
                let structure = structures[ index ];
                if (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) {
                    if (structure.hits < wallTarget && tower.energy >= 500) {
                        tower.repair(structure);
                        break;
                    }
                } else
                if (structure.hits < structure.hitsMax) {
                    tower.repair(structure);
                    break;
                }
            }
        });
    }
};
