const clear_memory = require("util.memory_clear");
const spawn_creeps = require("task.spawncreeps");
const assign_roles = require("task.assign_roles");
const renew = require("util.renew");
const towers = require("task.towers");
const set_roles = require("task.set_roles");
const assign_ids = require("task.assign_ids");

module.exports.loop = function() {
    PathFinder.use(true);
    clear_memory();
    spawn_creeps();
    renew();
    set_roles();
    assign_roles();
    towers();
    if(Game.time % 100 == 0) {
        assign_ids();
    }
};
