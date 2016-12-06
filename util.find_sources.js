module.exports = (creep) => {
    const sources = creep.room.find(FIND_SOURCES)
    return sources[Math.floor(Math.random()*sources.length)].id;
}
