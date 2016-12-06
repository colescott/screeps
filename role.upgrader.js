const config = require('config');
const renew = require('util.renew');
const get_energy = require('util.get_energy');
const find_sources = require('util.find_sources');

const {
    source_id,
    spawner_name,
    regenAt
} = config;

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (!creep.memory.source) {
            creep.memory.source = find_sources(creep);
        }
        if(!creep.memory.renewing) {
            if(creep.memory.upgrading && creep.carry.energy == 0) {
                creep.memory.source = find_sources(creep);
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
                get_energy(creep);
            }
        }
    }
};

module.exports = roleUpgrader;
