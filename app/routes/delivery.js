const drone = require('netology-fake-drone-api');

exports.addNew = (req, res) => {
    drone
        .deliver()
        .then(() => res.send(true))
        .catch(() => res.send(false));
};