const config = require('config');

const {
    spawner_name,
    wallTarget
} = config;

module.exports = () => {
    var towers = Game.spawns[spawner_name].room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});

    var hostiles = Game.spawns[spawner_name].room.find(FIND_HOSTILE_CREEPS);
    if(hostiles.length > 0) {
        towers.forEach(tower => tower.attack(hostiles[0]));
    } else {
        towers.forEach(tower => {
            var structures = tower.room.find(FIND_STRUCTURES);
            for(var index in structures)
            {
                var structure = structures[index];
                if(structure.structureType == STRUCTURE_WALL)
                {
                    if(structure.hits < wallTarget) {
                        tower.repair(structure);
                        break;
                    }
                } else
                if(structure.hits < structure.hitsMax) {
                    tower.repair(structure);
                    break;
                }
            }
        });
    }
};
