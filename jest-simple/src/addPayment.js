/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
Notes:

Steps or Videos:
0. intro the thing we want to test
1. how to setup jest in a project
2. 2 ways of testing, test first, test after (we will demo test first)
3. show coverage reporting (show the report going down when adding branch)
4. talk about simple in/out testing vs io and changing values
5. impliment tuesday price drop
6. impliment api call (dep inject)

Test Scenario:
return coffee price based on:
- the current cost of coffee (external api call)
- day of the week (value that changes over time)
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// BUSINESS LOGIC
const calculatedPrice = (price, day) => {
    if (price <= 200) {
        return price
    }

    if (day === 2) {
        return price - 100
    }

    return price
}

// VALIDATION
const invalidCoffeePrice = x => {
    if (!x) {
        return 'unavailable'
    }

    if (x === 'not working') {
        return 'unavailable price'
    }

    return false
}

module.exports = io => async () => {
    const day = io.getCurrentDay()
    const price = await io.getCoffeePrice().catch(x => x.message)
    const invalid = invalidCoffeePrice(price)

    if (invalid) {
        return {
            statusCode: 500,
            data: JSON.stringify({
                coffeePrice: invalid
            })
        }
    }

    const result = calculatedPrice(price, day)
    return {
        statusCode: 200,
        data: JSON.stringify({
            coffeePrice: result
        })
    }
}
