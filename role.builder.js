const config = require('config');

const {
    source_id,
    spawner_name,
    wallTarget,
    regenAt
} = config;

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.ticksToLive < regenAt) {
          if(Game.spawns[spawner_name].renewCreep(creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns[spawner_name]);
          } else {
            Game.spawns[spawner_name].renewCreep(creep);
          }
        } else {
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
                // Repair stuff if no construction sites found
                var structures = creep.room.find(FIND_STRUCTURES);
                for(var index in structures)
                {
                    var structure = structures[index];
                    if(structure.structureType == STRUCTURE_WALL)
                    {
                        if(structure.hits < wallTarget) {
                            if(creep.repair(structure) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(structure);
                            }
                            break;
                        }
                    } else
                    if(structure.hits < structure.hitsMax) {
                        if(creep.repair(structure) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(structure);
                        }
                        break;
                    }
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[source_id]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[source_id]);
            }
        }
      }
    }
};

module.exports = roleBuilder;
