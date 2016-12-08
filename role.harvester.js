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
                creep.memory.target = null;
            }
            if(creep.memory.harvesting && creep.carry.energy == creep.carryCapacity) {
                creep.memory.harvesting = false;
            }
            if(creep.memory.harvesting) {
                get_energy(creep);
            }
            else {
                if(getTargets(creep).length > 0) {
                    var target = Game.getObjectById(creep.memory.target);
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    } else if(creep.transfer(target, RESOURCE_ENERGY) != OK) {
                        creep.memory.target = getTargets(creep)[0].id;
                    }
                } else {
                    // If no tagets, fill energy then return to rally point
                    if(creep.carry.energy < creep.carryCapacity) {
                        creep.memory.harvesting = true;
                    } else {
                        creep.moveTo(Game.flags.harvester);
                    }
                }
            }
        }
    }
};
getTargets = (creep) => {
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
    });
    return targets;
}
function RoleHarvester(creep) {
    this.creep = creep;
    this.memory = this.creep.memory;
}

RoleHarvester.prototype.run = function(){
    roleHarvester.run(this.creep);
}

module.exports = RoleHarvester;
