const config = require('config');

const {
    source_id
} = config;

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.renewing) {
        if(!creep.memory.harvesting && creep.carry.energy == 0) {
            creep.memory.harvesting = true;
        }
        if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.harvesting = false;
        }
        if(creep.memory.harvesting) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[source_id]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[source_id]);
            }
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
            } else {
                // If no tagets, fill energy then return to rally point
                if(creep.carry.energy < creep.carryCapacity)
                {
                    creep.memory.harvesting = true;
                } else {
                    creep.moveTo(Game.flags.harvester);
                }
            }
        }
      }
    }
};

module.exports = roleHarvester;
