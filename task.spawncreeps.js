var targetHarvesters = 2;
var targetUpgraders = 3;
var targetBuilders = 2;

module.exports = () => {
    var totalHarvesters = 0;
    var totalUpgraders = 0;
    var totalBuilders = 0;

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            totalHarvesters++;
        }
        if(creep.memory.role == 'upgrader') {
            totalUpgraders++;
        }
        if(creep.memory.role == 'builder') {
            totalBuilders++;
        }
    }

    if(totalHarvesters < targetHarvesters) {
        Game.spawns['Spawn1'].createCreep( [WORK, CARRY, CARRY, MOVE, MOVE], 'Harvester' + Math.floor(Math.random() * 1024), {role: "harvester"});
    } else
    if(totalUpgraders < targetUpgraders) {
        Game.spawns['Spawn1'].createCreep( [WORK, CARRY, CARRY, MOVE, MOVE], 'Upgrader' + Math.floor(Math.random() * 1024), {role: "upgrader"});
    } else
    if(totalBuilders < targetBuilders) {
        Game.spawns['Spawn1'].createCreep( [WORK, CARRY, CARRY, MOVE, MOVE], 'Builder' + Math.floor(Math.random() * 1024), {role: "builder"});
    }
};
