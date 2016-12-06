module.exports = {
    spawn: {
        targetHarvesters: 2,
        targetUpgraders: 5,
        targetBuilders: 3,
    },
    spawn_types: {
        builder: [WORK, CARRY, CARRY, MOVE, MOVE],
        upgrader: [WORK, CARRY, CARRY, MOVE, MOVE],
        harvester: [WORK, CARRY, CARRY, MOVE, MOVE]
    },
    spawner_name: "Spawn1",
    source_id: 0,
    wallTarget: 20000
};
