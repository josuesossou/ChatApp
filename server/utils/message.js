const moment = require('moment');

const generateMessage = (from, text) => {
    return {
        from,
        text,
        completedAt: moment().valueOf()
    }
};

const generateLocation = (from, latitude, longitude) => {
    return {
        from,
        url:`http://www.google.com/maps/?q=${latitude},${longitude}`,
        completedAt: moment().valueOf()
    }
}

module.exports = {generateMessage, generateLocation}