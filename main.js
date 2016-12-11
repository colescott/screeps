const clear_memory = require("util.memory_clear");
const spawn_creeps = require("task.spawncreeps");
const assign_roles = require("task.assign_roles");
const renew = require("util.renew");
const towers = require("task.towers");
const set_roles = require("task.set_roles");
const assign_ids = require("task.assign_ids");

const count_creeps = require("util.count_creeps");
const energy = require("util.percent_energy");
const config = require("config");


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
        status();
    }
};
status = () => {
    const controller = Game.spawns[ config.spawner_name ].room.controller;
    console.log(`<h4>   Status</h4>\
    Creeps: ${count_creeps()}/${config.spawn.targetWorkers}
    Energy: ${Math.round(energy())}%
    Room Controller: level ${controller.level}, ${Math.round(100 * controller.progress/controller.progressTotal)}% to next level
    `);
    return;

};
