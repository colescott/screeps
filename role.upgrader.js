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
        //Setup
        if (!creep.memory.setup) {
            creep.memory.setup = true;
            roleUpgrader.setup(creep);
        }
        // Assuming it isn't fixing itself
        if(!creep.memory.renewing) {
            if(creep.memory.upgrading && creep.carry.energy == 0) {
                roleUpgrader.energyMode(creep);
                creep.memory.upgrading = false;
            }
            if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
                roleUpgrader.taskMode(creep);
                creep.memory.upgrading = true;
            }
            if(creep.memory.upgrading) {
                roleUpgrader.doTask(creep);
            }
            else {
                roleUpgrader.getEnergy(creep);
            }
        }
    },
    setup: function(creep) {
        creep.memory.source = find_sources(creep);
    },
    doTask: function(creep) {
        const res = creep.upgradeController(creep.room.controller);
        if(res == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    },
    getEnergy: function(creep) {
        get_energy(creep);
    },
    energyMode: function(creep) {
        creep.memory.source = find_sources(creep);
    },
    taskMode: function(creep) {}
};

module.exports = roleUpgrader;
