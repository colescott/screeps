module.exports = () => {
    for (let mem in Memory.creeps) {
        if (!Game.creeps[ mem ]) {
            delete Memory.creeps[ mem ];
        }
    }
};
