module.exports = (type) => {
    var res = 0;
    for(name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.type == type || type == null) {
            res++;
        }
    }
    return res;
}
