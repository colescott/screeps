const config = require('config');

const {
    source_id,
    spawner_name,
    regenAt
} = config;

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.ticksToLive < regenAt) {
          if(Game.spawns[spawner_name].renewCreep(creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns[spawner_name]);
          } else {
            Game.spawns[spawner_name].renewCreep(creep);
          }
        } else {
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[source_id]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[source_id]);
            }
        }
      }
    }
};

module.exports = roleUpgrader;
