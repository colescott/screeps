const config = require('config');
const get_energy = require('util.get_energy');
const find_sources = require('util.find_sources');

const {
    source_id,
    wallTarget
} = config;

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!creep.memory.source) {
            creep.memory.source = find_sources(creep);
        }
        if(!creep.memory.renewing) {
          if(creep.memory.building && creep.carry.energy == 0) {
              creep.memory.source = find_sources(creep);
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

RoleBuilder.prototype.run = function() {
    roleBuilder.run(this.creep);
}

module.exports = RoleBuilder;
