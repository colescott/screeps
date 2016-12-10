module.exports = () => {
    var i = 0;
    for(let name in Game.creeps) {
        Game.creeps[name].memory.id = i;
        i++;
    }
}
