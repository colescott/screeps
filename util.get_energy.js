const find_sources = require("util.find_sources");

module.exports = (creep) => {
    const source = Game.getObjectById(creep.memory.source);
    const res = creep.harvest(source);
    if (res == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
    } else if (res != OK || creep.moveTo(source) != OK) {
        creep.memory.source = find_sources(creep);
    }
};
