const config = require("config");
const get_energy = require("util.get_energy");
const find_sources = require("util.find_sources");
var RoleHarvester = require("role.harvester");
const RoleBase = require("role.base");

const {
    source_id,
    wallTarget
} = config;

class RoleBuilder extends RoleBase {
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
        const target = Game.getObjectById(this.memory.target);
        if (target) {
            const res = this.creep.build(target);
            if (res == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(target);
            } else if (res == ERR_INVALID_TARGET) {
                this.getNewTarget();
            }
        } else {
            // reset the work process
            this.getNewTarget();
        }
    }
    switchToWork() {}
    getNewTarget() {
        const targets = this.creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets[ 0 ]) {
            this.memory.target = targets[ 0 ].id;
            return;
        }
        const manager = new RoleHarvester(this.creep);
        manager.run();
    }
    switchToEnergy() {
        this.memory.source = find_sources(this.creep);
    }
}

module.exports = RoleBuilder;
