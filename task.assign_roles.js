var RoleHarvester = require('role.harvester');
var RoleUpgrader = require('role.upgrader');
var RoleBuilder = require('role.builder');

module.exports = () => {
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            const manager = new RoleHarvester(creep);
            manager.run();
        }
        if(creep.memory.role == 'upgrader') {
            const manager = new RoleUpgrader(creep);
            manager.run();
        }
        if(creep.memory.role == 'builder') {
            const manager = new RoleBuilder(creep);
            manager.run();
        }
    }
}
