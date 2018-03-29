const generateMessage = (from, text) => {
    return {
        from,
        text,
        completedAt: new Date().getTime()
    }
};

const generateLocation = (from, latitude, longitude) => {
    return {
        from,
        url:`http://www.google.com/maps/?q=${latitude},${longitude}`,
        completedAt: new Date().getTime()
    }
}

module.exports = {generateMessage, generateLocation}