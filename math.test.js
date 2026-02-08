const adder = module.require('./math.js')

test('att 5+12 blir 17', ()=>{
    expect(adder(5, 12)).toBe(17);
})