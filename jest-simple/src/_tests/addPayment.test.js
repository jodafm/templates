const main = require('../addPayment')
const mockIO = {
    getCurrentDay: () => 5,
    getCoffeePrice: () => new Promise(x => x(500))
}

const addPayment = main(mockIO)

test('can call addPayment', async () => {
    const result = await addPayment()
    expect(result).toBeTruthy()
})

test('returns 200 http message when successful', async () => {
    const result = await addPayment()
    expect(result.statusCode).toBe(200)
})

test('returns price of coffee', async () => {
    const result = await addPayment()
    expect(JSON.parse(result.data).coffeePrice).toBe(500)
})

test('on tuesdays, coffee price is 1 dollar less', async () => {
    const mockIO = {
        getCurrentDay: () => 2,
        getCoffeePrice: () => new Promise(x => x(500))
    }

    const addPayment = main(mockIO)
    const result = await addPayment()
    expect(JSON.parse(result.data).coffeePrice).toBe(400)
})

test('will give coffee price based on information from external service', async () => {
    const mockIO = {
        getCurrentDay: () => 5,
        getCoffeePrice: () => new Promise(x => x(100))
    }

    const addPayment = main(mockIO)
    const result = await addPayment()
    expect(JSON.parse(result.data).coffeePrice).toBe(100)
})

test('will discount coffee price from external service on tuesdays', async () => {
    const mockIO = {
        getCurrentDay: () => 2,
        getCoffeePrice: () => new Promise(x => x(300))
    }

    const addPayment = main(mockIO)
    const result = await addPayment()
    expect(JSON.parse(result.data).coffeePrice).toBe(200)
})

test('if coffee price is 200 or below, we will not give a discount', async () => {
    const mockIO = {
        getCurrentDay: () => 2,
        getCoffeePrice: () => new Promise(x => x(200))
    }

    const addPayment = main(mockIO)
    const result = await addPayment()
    expect(JSON.parse(result.data).coffeePrice).toBe(200)
})

test('will return unavailable price if external api properly gives us an error message', async () => {
    const mockIO = {
        getCurrentDay: () => 2,
        getCoffeePrice: () =>
            new Promise((x, rej) => rej({ message: 'not working' }))
    }

    const addPayment = main(mockIO)
    const result = await addPayment()
    expect(JSON.parse(result.data).coffeePrice).toBe('unavailable price')
})

test('will return unavailable if external api returns null', async () => {
    const mockIO = {
        getCurrentDay: () => 2,
        getCoffeePrice: () => new Promise(x => x(null))
    }

    const addPayment = main(mockIO)
    const result = await addPayment()
    expect(JSON.parse(result.data).coffeePrice).toBe('unavailable')
})
