const config = require('config');
const get_energy = require('util.get_energy');
const find_sources = require('util.find_sources');
var RoleHarvester = require('role.harvester');
const RoleBase = require('role.base');

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
        const target = Game.getObjectById(this.creep.memory.target);
        console.log(target);
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
        if (targets[0]) {
            this.memory.target = targets[0].id;
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
