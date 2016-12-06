var clear_memory = require('util.memory_clear');
var spawn_creeps = require('task.spawncreeps');
var assign_roles = require('task.assign_roles');
var renew = require('util.renew');

module.exports.loop = function () {
    clear_memory();
    spawn_creeps();
    renew();
    assign_roles();
}
