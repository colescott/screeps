const config = require('config');
const countCreeps = require('util.count_creeps');

const {
    targetHarvesters,
    targetUpgraders,
    targetBuilders
} = config.spawn;

module.exports = () => {
    const spawner_name = config.spawner_name;
    if(countCreeps('harvester') < targetHarvesters && (Game.spawns[spawner_name].canCreateCreep(config.spawn_types.harvester) == OK)) {
        Game.spawns[ spawner_name ].createCreep(config.spawn_types.harvester, `Harvester${  Math.floor(Math.random() * 1024)}`, { role: "harvester" });
    } else
    if(countCreeps('upgrader') < targetUpgraders && (Game.spawns[spawner_name].canCreateCreep(config.spawn_types.upgrader) == OK)) {
        Game.spawns[ spawner_name ].createCreep(config.spawn_types.upgrader, `Upgrader${  Math.floor(Math.random() * 1024)}`, { role: "upgrader" });
    } else
    if(countCreeps('builder') < targetBuilders && (Game.spawns[spawner_name].canCreateCreep(config.spawn_types.builder) == OK)) {
        Game.spawns[ spawner_name ].createCreep(config.spawn_types.builder, `Builder${  Math.floor(Math.random() * 1024)}`, { role: "builder" });
    }
};
