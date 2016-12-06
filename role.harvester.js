const config = require('config');
const {
    source_id,
    spawner_name
} = config;

const get_energy = require('util.get_energy');
const find_sources = require('util.find_sources');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.ticksToLive < 100) {
          if(Game.spawns[spawner_name].renewCreep(creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns[spawner_name]);
          } else {
            Game.spawns[spawner_name].renewCreep(creep);
          }
        } else {
        if (!creep.memory.source) {
            creep.memory.source = find_sources(creep);
        }
        if(!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.source = find_sources(creep);
            creep.memory.harvesting = true;
        }
        if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
        }
        if(creep.memory.harvesting) {
            get_energy(creep);
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
      }
    }
};

module.exports = roleHarvester;
