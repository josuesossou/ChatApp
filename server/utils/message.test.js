const expect = require('expect');

const {generateMessage} = require('./message');
const {generateLocation} = require('./message');

describe('Generating Messages', ()=>{

    it('should return a message with from and text property', ()=>{
        let from = "John";
        let text = "Hi john"
        let message = generateMessage(from, text);

        expect(message.text).toBe(text);
        expect(message.from).toBe(from);
        expect(typeof message.completedAt).toBe('number')

    })

});

describe('Generating Location', ()=>{

    it('should return a location message with a url property', ()=>{
        let latitude = 1;
        let longitude = 1;
        let location = generateLocation("User", latitude, longitude);

        expect(location.from).toBe("User")
        expect(location.url).toBe(`http://www.google.com/maps/?q=${latitude},${longitude}`)
        expect(typeof location.completedAt).toBe("number")
    })

})