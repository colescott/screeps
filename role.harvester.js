const get_energy = require("util.get_energy");
const find_sources = require("util.find_sources");
const RoleBase = require("role.base");
const RoleUpgrader = require("role.upgrader");

class RoleHarvester extends RoleBase {
    constructor(creep) {
        super(creep);
    }
    setup() {
        this.memory.source = find_sources(this.creep);
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
            let target = Game.getObjectById(this.creep.memory.target);
            if (this.creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(target);
            } else if (this.creep.transfer(target, RESOURCE_ENERGY) != OK) {
                this.memory.target = targets[ 0 ].id;
            }
        }
    }
    switchToEnergy() {
        this.memory.source = find_sources(this.creep);
    }
    switchToWork() {}
}

module.exports = RoleHarvester;
