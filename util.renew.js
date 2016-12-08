var lodash = require("lodash");

const {
    regenAt,
    spawner_name,
    spawn_types,
    kill_bad
} = require("config");

module.exports = () => {
    for (let name in Game.creeps) {
        let creep = Game.creeps[ name ];
        isProper(creep);
        if (creep.ticksToLive < regenAt
        && Game.spawns[ spawner_name ].energy > 50
        && isProper(creep)) {
            creep.memory.renewing = true;
        }
        if ((creep.ticksToLive > 1000)) {
            creep.memory.renewing = false;
        }
        if (creep.memory.renewing) {
            let error = Game.spawns[ spawner_name ].renewCreep(creep);

            if (error == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns[ spawner_name ]);
            } else if (error == ERR_NOT_ENOUGH_ENERGY) {
                creep.memory.renewing = false;
            }
        }
    }
};

let isProper = (creep) => {
    if (lodash.isEqual(creep.body.map(e => e.type).sort(), spawn_types[ creep.memory.role ].sort())) {
        return true;
    }
    if (!kill_bad) {
        return true;
    }
    return false;
};
