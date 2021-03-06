const get_energy = require("util.get_energy");
const find_sources = require("util.find_sources");
const RoleBase = require("role.base");

class RoleUpgrader extends RoleBase {
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
        const res = this.creep.upgradeController(this.creep.room.controller);
        if (res == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(this.creep.room.controller);
        }
    }
    switchToWork() {}
    switchToEnergy() {
        this.memory.source = find_sources(this.creep);
    }
}

module.exports = RoleUpgrader;
