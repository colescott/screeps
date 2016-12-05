var clear_memory = require('util.memory_clear');
var spawn_creeps = require('task.spawncreeps');
var assign_roles = require('task.assign_roles');

module.exports.loop = function () {
    totalHarvesters = 0;
    totalUpgraders = 0;
    totalBuilders = 0;

    clear_memory();
    spawn_creeps();
    assign_roles();
}
