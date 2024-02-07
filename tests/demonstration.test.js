

describe('cs-400 demonstration', ()=>{
    test("basic addition should work", ()=>{

        let num1= 20;
        let num2= 30;
        let sum= num1+num2;
    
        expect(sum).toBe(20+30)
    });

    test("squaring a number should result in not the number right below it", ()=>{
        let num = 7;
        let square= num*num;

        expect(square).not.toBe(48);
    });

    test("one variable is defined and one is not", ()=>{
        let num1= undefined;
        let num2= 10000;

        expect(num1).toBeUndefined();
        expect(num2).not.toBeUndefined();
    });

    test("Toronto, Canada contains a ','", ()=>{
        let toronto = 'Toronto, Canada';

        expect(toronto).toMatch(/,/);
    });

    test("numbers correctly compare to each other", ()=>{
        let num1=500;
        let num2=203;
        let num3=501;
        let num4=1;

        expect(num1).toBeGreaterThan(num2);
        expect(num2).toBeLessThan(num3);
        expect(num3-num1).toBeGreaterThanOrEqual(num4);
    });

})
