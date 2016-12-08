const config = require('config');
const renew = require('util.renew');
const get_energy = require('util.get_energy');
const find_sources = require('util.find_sources');
const RoleBase = require('role.base');

const {
    source_id,
    spawner_name,
    regenAt
} = config;

class RoleUpgrader extends RoleBase {
    setup() {
        this.creep.memory.source = find_sources(creep);
    }
    getEnergy() {
        get_energy(this.creep);
    }
    work() {
        const res = this.creep.upgradeController(this.creep.room.controller);
        if(res == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(this.creep.room.controller);
        }
    }
    switchToWork() {}
    switchToEnergy() {
        this.memory.source = find_sources(creep);
    }
}

module.exports = RoleUpgrader;
