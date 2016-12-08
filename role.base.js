class RoleBase {
    constructor(creep) {
        this.creep = creep;
        this.memory = creep.memory;
        if (!this.memory.setup) {
            this.memory.setup = true;
            this.setup();
        }
    }
    run() {
        // if its renewing, skip
        if (this.memory.renewing) {
            return;
        }

        // do the correct task
        if (this.memory.getting_energy) {
            this.getEnergy();
        } else {
            this.work();
        }
        // check if should switch task
        if (!this.memory.getting_energy && this.creep.carry.energy == 0) {
            // shoud start gathering energy
            this.memory.getting_energy = true;
            this.switchToEnergy();
        } else if (this.memory.getting_energy == true && this.creep.carry.energy == this.creep.carryCapacity) {
            // shoud start working
            this.memory.getting_energy = false;
            this.switchToWork();
        }
    }
}

module.exports = RoleBase;
