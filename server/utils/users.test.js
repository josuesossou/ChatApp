const expect = require('expect');
const {Users} = require('./users')

describe('Users', ()=>{

    let users;

    beforeEach(()=>{
        users  = new Users()
        users.users = [{
            id:1,
            name: 'Kodjo',
            room:'Node course'
        },
        {
            id:2,
            name: 'Kokou',
            room:'React course'
        },
        {
            id:3,
            name: 'Afi',
            room:'Node course'
        }]
    })

    it('should add a user', ()=>{
        
        let users = new Users();
        user = {
            id:'123',
            name:"Josue",
            room:"Study"
        }
        let res = users.addUser(user.id, user.name, user.room);

        expect(res).toEqual(user);
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', ()=>{

        let removedUser = users.removeUser(1);

        expect(removedUser).toEqual({
            id:1,
            name: 'Kodjo',
            room:'Node course'
        });
        expect(users.users.length).toBe(2);

    });
    it('should not remove a user', ()=>{

        let removedUser = users.removeUser(4);
        
        expect(removedUser).toBe(undefined);
        expect(users.users.length).toBe(3);

    });

    it('should find a user', ()=>{
        let user = users.getUser(2);

        expect(user).toEqual(users.users[1]);
        expect(users.users.length).toBe(3);
    });
    it('should not get a user',()=>{
        let user = users.getUser(5);

        expect(user).toBe(undefined);
        expect(users.users.length).toBe(3);
    });

    it('should return names for node couse', ()=>{

        let names = users.getUserList('Node course');

        expect(names).toEqual(['Kodjo', 'Afi'])

    });
    it('should return names for react couse', ()=>{

        let names = users.getUserList('React course');

        expect(names).toEqual(['Kokou'])

    })
})