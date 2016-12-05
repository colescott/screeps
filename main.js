var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var targetHarvesters = 2;
var targetUpgraders = 3;
var targetBuilders = 2;

var totalHarvesters = 0;
var totalUpgraders = 0;
var totalBuilders = 0;

var clear_memory = require('util.memory_clear');

module.exports.loop = function () {
    totalHarvesters = 0;
    totalUpgraders = 0;
    totalBuilders = 0;

    clear_memory();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            totalHarvesters++;
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            totalUpgraders++;
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            totalBuilders++;
            roleBuilder.run(creep);
        }
    }

    // Spawn new creeps to meet target values
    if(totalHarvesters < targetHarvesters) {
        Game.spawns['Spawn1'].createCreep( [WORK, CARRY, CARRY, MOVE, MOVE], 'Harvester' + Math.floor(Math.random() * 1024), {role: "harvester"});
    } else
    if(totalUpgraders < targetUpgraders) {
        Game.spawns['Spawn1'].createCreep( [WORK, CARRY, CARRY, MOVE, MOVE], 'Upgrader' + Math.floor(Math.random() * 1024), {role: "upgrader"});
    } else
    if(totalBuilders < targetBuilders) {
        Game.spawns['Spawn1'].createCreep( [WORK, CARRY, CARRY, MOVE, MOVE], 'Builder' + Math.floor(Math.random() * 1024), {role: "builder"});
    }
}
