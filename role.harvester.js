const get_energy = require("util.get_energy");
const find_sources = require("util.find_sources");
const config = require("config");
const RoleBase = require("role.base");

const {
    source_id
} = config;

class RoleHarvester extends RoleBase {
    constructor(creep) {
        super(creep);
    }
    setup() {
        this.memory.source = find_sources(creep);
    }
    getEnergy() {
        get_energy(this.creep);
    }
    work() {
        var targets = this.creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
        });
        if (targets.length > 0) {
            var target = Game.getObjectById(this.creep.memory.target);
            if (this.creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(target);
            } else if (this.creep.transfer(target, RESOURCE_ENERGY) != OK) {
                this.memory.target = targets[ 0 ].id;
            }
        } else {
            // If no tagets, fill energy then return to rally point
            if (this.creep.carry.energy < this.creep.carryCapacity)
            {
                this.memory.harvesting = true;
            } else {
                this.creep.moveTo(Game.flags.harvester);
            }
        }
    }
    switchToEnergy() {
        this.memory.source = find_sources(this.creep);
    }
    switchToWork() {}
}

module.exports = RoleHarvester;
