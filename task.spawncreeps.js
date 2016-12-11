const config = require('config');
const countCreeps = require('util.count_creeps');
const assign_ids = require('task.assign_ids');
const {
    targetWorkers
} = config.spawn;

module.exports = () => {
    const spawner_name = config.spawner_name;
    if(countCreeps() == 0 && (Game.spawns[spawner_name].canCreateCreep([WORK, CARRY, CARRY, MOVE, MOVE]) == OK)) {
        Game.spawns[ spawner_name ].createCreep([WORK, CARRY, CARRY, MOVE, MOVE], `EHarvester`, { role: "harvester" });
    } else if(countCreeps() < targetWorkers && (Game.spawns[spawner_name].canCreateCreep(config.spawn_types.worker) == OK)) {
        Game.spawns[ spawner_name ].createCreep(config.spawn_types.worker, `Worker${  Math.floor(Math.random() * 1024)}`, { type: "worker" });
        assign_ids();
    }
};
