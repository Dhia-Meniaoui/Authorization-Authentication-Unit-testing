

function absolute(params) {
     return (params >= 0)? params : -params;
 }

 function green(str) {
     return 'hallo '+ str;
 }

 function registeruser(username) {
     if(!username) throw new Error('username is required');
      
     return {id : new Date().getTime(), username : username};
 }

describe('absolute', () => {
     it('should retrun a postive number', ()=> {
          const result = absolute(5);
          expect(result).toBe(5);
     });
     it('shouldn t return a negetive nomber ' , () => {
          const result= absolute(-5);
          expect(result).toBe(5);
     });
     
     it('should return 0' , ()=> {
          const result= absolute(0);
          expect(result).toBe(0);
     });
})

describe('green' , () => {
     it('test the message' , () => {
          const result = green('dhia');
          expect(result).toContain('hallo dhia');
     });
});

describe('throw' , () => {
     it('shouldn t be null', ()=> {
          const args = [null , undefined , 0 , '' , false];
          args.forEach(element => {     
               expect(() => {registeruser(element)}).toThrow();
          });
     });
});

     