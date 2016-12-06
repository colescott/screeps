module.exports = (creep) => {
    return creep.room.find(FIND_SOURCES)[Math.floor(Math.random()*2)].id;
}
