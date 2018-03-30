const expect = require("expect");
const {isRealString} = require("./validation.js");


describe("Is real string?", ()=>{

    it('should reject non string values', ()=>{
        const val = isRealString(12);
        expect(val).toBe(false)
    });

    it('should reject strings with only spaces', ()=>{
        const val = isRealString('     ');
        expect(val).toBe(false)
    })

    it('should accept string with non-space characters', ()=>{
        const val = isRealString('Hell o ');
        expect(val).toBe(true)
    })

})