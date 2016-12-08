module.exports = (creep) => {
    const source = Game.getObjectById(creep.memory.source);
    const res = creep.harvest(source);
    if (res == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
    } else if (res == ERR_NOT_ENOUGH_ENERGY) {
        creep.moveTo(source);
    }
};
