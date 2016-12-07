module.exports = (creep, log = false) => {
    const source = Game.getObjectById(creep.memory.source);
    const res = creep.harvest(source);
    if (log) {
        console.log(`Getting energy ${res} at ${source}`);
    }
    if(res == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
    }
}
