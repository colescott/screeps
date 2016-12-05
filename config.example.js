module.exports = {
    spawn: {
        targetBuilders: 3,
        targetUpgraders: 5,
        targetHarvesters: 2
    },
    spawn_types: {
        builder: [WORK, CARRY, CARRY, MOVE, MOVE],
        upgrader: [WORK, CARRY, CARRY, MOVE, MOVE],
        harvester: [WORK, CARRY, CARRY, MOVE, MOVE]
    },
    spawner_name: "Spawn1"
};
