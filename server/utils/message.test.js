const expect = require('expect');

const {generateMessage} = require('./message');

describe('Generating Messages', ()=>{

    it('should return a message with from and text property', ()=>{
        let from = "John";
        let text = "Hi john"
        let message = generateMessage(from, text);

        expect(message.text).toBe(text);
        expect(message.from).toBe(from);
        expect(typeof message.completedAt).toBe('number')

    })

})