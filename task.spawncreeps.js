const config = require("config");

const {
    targetHarvesters,
    targetUpgraders,
    targetBuilders
} = config.spawn;

module.exports = () => {
    var totalHarvesters = 0;
    var totalUpgraders = 0;
    var totalBuilders = 0;

    for (var name in Game.creeps) {
        var creep = Game.creeps[ name ];
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
