var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var targetHarvesters = 2;
var targetUpgraders = 2;
var targetBuilders = 2;

var totalHarvesters = 0;
var totalUpgraders = 0;
var totalBuilders = 0;

module.exports.loop = function () {
    totalHarvesters = 0;
    totalUpgraders = 0;
    totalBuilders = 0;

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
        Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE], 'Harvester', {role: "harvester"});
        totalHarvesters++;
    }
    if(totalUpgraders < targetUpgraders) {
        Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE], 'Upgrader', {role: "upgrader"});
        totalUpgraders++;
    }
    if(totalBuilders < targetBuilders) {
        Game.spawns['Spawn1'].createCreep( [WORK, CARRY, MOVE], 'Builder', {role: "builder"});
        totalBuilders++;
    }
}
