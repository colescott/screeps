const get_energy = require('util.get_energy');
const find_sources = require('util.find_sources');
const config = require('config');

const {
    source_id
} = config;

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!creep.memory.source) {
            creep.memory.source = find_sources(creep);
        }
        if(!creep.memory.renewing) {
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
                                    structure.structureType == STRUCTURE_TOWER ||
                                    structure.structureType == STRUCTURE_CONTAINER ||
                                    structure.structureType == STRUCTURE_STORAGE) && structure.energy < structure.energyCapacity;
                        }
                });
                if(targets.length > 0) {
                    var target = Game.getObjectById(creep.memory.target);
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    } else if(creep.transfer(target, RESOURCE_ENERGY) != OK) {
                        creep.memory.target = targets[0].id;
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

function RoleHarvester(creep) {
    this.creep = creep;
    this.memory = this.creep.memory;
}

RoleHarvester.prototype.run = function(){
    roleHarvester.run(this.creep);
}

module.exports = RoleHarvester;
