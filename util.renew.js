const {
  regenAt,
  spawner_name
} = require('config');

module.exports = () => {
  for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.ticksToLive < regenAt && (Game.spawns[spawner_name].renewCreep(creep) != ERR_NOT_ENOUGH_ENERGY)) {
      creep.memory.renewing = true;
    }
    if((creep.memory.renewing && creep.ticksToLive > 1000) || Game.spawns[spawner_name].renewCreep(creep) == ERR_NOT_ENOUGH_ENERGY) {
      creep.memory.renewing = false;
    }
    if(creep.memory.renewing) {
      if(Game.spawns[spawner_name].renewCreep(creep) == ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.spawns[spawner_name]);
      } else {
        Game.spawns[spawner_name].renewCreep(creep);
      }
    }
  }
}
