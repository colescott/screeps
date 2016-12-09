const {
    source_rotate,
    source_id
} = require("config");

module.exports = (creep) => {
    const sources = creep.room.find(FIND_SOURCES);
    if (source_rotate) {
        const n = Math.floor(Math.random() * sources.length);
        return sources[ n ].id;
    }
    return sources[ source_id ].id;
};
