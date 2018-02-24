const drone = require('netology-fake-drone-api');

exports.addNew = (req, res) => {
    res.send(drone.deliver());
};