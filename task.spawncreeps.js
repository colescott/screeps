const config = require("config");

const {
    targetHarvesters,
    targetUpgraders,
    targetBuilders
} = config.spawn;

module.exports = () => {
    let totalHarvesters = 0;
    let totalUpgraders = 0;
    let totalBuilders = 0;

    for (let name in Game.creeps) {
        let creep = Game.creeps[ name ];
        if (creep.memory.role == "harvester") {
            totalHarvesters++;
        }
        if (creep.memory.role == "upgrader") {
            totalUpgraders++;
        }
        if (creep.memory.role == "builder") {
            totalBuilders++;
        }
    }
    const spawner_name = config.spawner_name;
    if (totalHarvesters < targetHarvesters && (Game.spawns[ spawner_name ].canCreateCreep(config.spawn_types.harvester) == OK)) {
        Game.spawns[ spawner_name ].createCreep(config.spawn_types.harvester, `Harvester${  Math.floor(Math.random() * 1024)}`, { role: "harvester" });
    } else
    if (totalUpgraders < targetUpgraders && (Game.spawns[ spawner_name ].canCreateCreep(config.spawn_types.upgrader) == OK)) {
        Game.spawns[ spawner_name ].createCreep(config.spawn_types.upgrader, `Upgrader${  Math.floor(Math.random() * 1024)}`, { role: "upgrader" });
    } else
    if (totalBuilders < targetBuilders && (Game.spawns[ spawner_name ].canCreateCreep(config.spawn_types.builder) == OK)) {
        Game.spawns[ spawner_name ].createCreep(config.spawn_types.builder, `Builder${  Math.floor(Math.random() * 1024)}`, { role: "builder" });
    }
};
