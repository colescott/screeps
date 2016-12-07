const {
    regenAt,
    spawner_name,
    spawn_types
} = require('config');

module.exports = () => {
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        isProper(creep);
        if(creep.ticksToLive < regenAt
        && (Game.spawns[spawner_name].energy > 50)
        && isProper(creep)) {
            creep.memory.renewing = true;
        }
        if((creep.ticksToLive > 1000)) {
            creep.memory.renewing = false;
        }
        if(creep.memory.renewing) {
            var error = Game.spawns[spawner_name].renewCreep(creep)

            if(error == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns[spawner_name]);
            } else if(error == ERR_NOT_ENOUGH_ENERGY) {
                creep.memory.renewing = false;
            }
        }
    }
}

var isProper = (creep) => {
    if(creep.body.map(e => e.type).toLocaleString() == spawn_types[creep.memory.role].toLocaleString()) {
        console.log(creep.name);
    }
}
