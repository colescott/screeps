module.exports = (creep) => {
    const res = creep.harvest(Game.getObjectById(creep.memory.source));
    if(res == ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.getObjectById(creep.memory.source));
    }
}
