const config = require('config');
const get_energy = require('util.get_energy');
const find_sources = require('util.find_sources');

var RoleHarvester = require('role.harvester');

const {
    source_id,
    wallTarget
} = config;

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(!creep.memory.renewing) {
          if(creep.memory.building && creep.carry.energy == 0) {
              creep.memory.building = false;
          }
          if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
              creep.memory.building = true;
          }

          if(creep.memory.building) {
              var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
              if(targets.length) {
                  if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                      creep.moveTo(targets[0]);
                  }
              } else {
                  // Repair stuff if no construction sites found
                  var structures = creep.room.find(FIND_STRUCTURES);
                  for(var index in structures)
                  {
                      var structure = structures[index];

                      if(structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART)
                      {
                          if(structure.hits < wallTarget) {
                              if(creep.repair(structure) == ERR_NOT_IN_RANGE) {
                                  creep.moveTo(structure);
                              }
                              break;
                          }
                      } else
                      if(structure.hits < structure.hitsMax) {
                          if(creep.repair(structure) == ERR_NOT_IN_RANGE) {
                              creep.moveTo(structure);
                          }
                          break;
                      }
                  }
              }
          }
          else {
                get_energy(creep);
          }
      }
    }
};

function RoleBuilder(creep) {
    this.creep = creep;
    this.memory = creep.memory;
}

RoleBuilder.prototype.run = function run() {
    // setup
    if (!this.memory.setup) {
        this.memory.setup = true;
        this.setup();
    }

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
    console.log("status", this.memory.getting_energy, this.creep.carry.energy);
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

    //roleBuilder.run(this.creep);
}

RoleBuilder.prototype.setup = function setup() {
    this.memory.source = find_sources(this.creep);
}

RoleBuilder.prototype.getEnergy = function getEnergy() {
    get_energy(this.creep);
}

RoleBuilder.prototype.work = function work() {
    const target = Game.getObjectById(this.creep.memory.target);
    if (target) {
        const res = this.creep.build(target);
        if (res == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target);
        }
    } else {
        // reset the work process
        this.getNewTarget();
    }
}

RoleBuilder.prototype.switchToWork = function switchToWork() {};

RoleBuilder.prototype.getNewTarget = function getNewTarget() {
    const targets = this.creep.room.find(FIND_CONSTRUCTION_SITES);
    if (targets[0]) {
        this.memory.target = targets[0].id;
        return;
    }
    const manager = new RoleHarvester(this.creep);
    manager.run();
}

RoleBuilder.prototype.switchToEnergy = function switchToEnergy() {
    this.memory.source = find_sources(this.creep);
};

module.exports = RoleBuilder;
