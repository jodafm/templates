const {save} = require('../handler')
const db = require('../db')

const simulateDbScenario = config => {
    db.getPic = jest.fn().mockImplementation(() => {
        return {
            pic: {
                url: 'https://google.com'
            },
            picError: config.getPicError ? 'Img cannot be found' : false
        }
    })

    db.getTweet = jest.fn().mockImplementation(() => {
        return {
            tweet: 'lorem ipsum...',
            tweetError: config.getTweetError ? 'Tweet cannot be found' : false
        }
    })

    db.saveHighlighted = jest.fn().mockImplementation((x) => {
        return {
            highlighted: x,
            highlightedError: config.saveHighlightedError ? 'Could not save highlighted' : false
        }
    })
}






describe('saveHighlighted', () => {
    // Success Branch
    test('will return success when saved properly', async () => {
        simulateDbScenario({
            getPicError: false,
            getTweetError: false,
            saveHighlightedError: false
        })

        const input = {
            id: 'product_1234',
            name: 'Coffee 1',
            price: 200
        }
        
        const result = await save({body: JSON.stringify(input)})

        expect(result.statusCode).toBe(200)
        expect(JSON.parse(result.body)).toEqual({
            id: 'product_1234', 
            name: 'Coffee 1',
            price: 200,
            tweet: 'lorem ipsum...',
            pic: 'https://google.com' 
        })
    })


    // Validation Error Branches
    test('will return 400 error if no id is supplied', async () => {
        simulateDbScenario({
            getPicError: false,
            getTweetError: false,
            saveHighlightedError: false
        })

        const input = {
            name: 'Coffee 1',
            price: 200
        }
        
        const result = await save({body: JSON.stringify(input)})

        expect(result.statusCode).toBe(400)
        expect(JSON.parse(result.body).message).toEqual('Must have an id')
    })

    test('will return 400 error if no name is supplied', async () => {
        simulateDbScenario({
            getPicError: false,
            getTweetError: false,
            saveHighlightedError: false
        })

        const input = {
            id: 'product_1234',
            price: 200
        }
        
        const result = await save({body: JSON.stringify(input)})

        expect(result.statusCode).toBe(400)
        expect(JSON.parse(result.body).message).toEqual('Must have a name')
    })

    test('will return 400 error if no price is supplied', async () => {
        simulateDbScenario({
            getPicError: false,
            getTweetError: false,
            saveHighlightedError: false
        })

        const input = {
            id: 'product_1234',
            name: 'Coffee 1'
        }
        
        const result = await save({body: JSON.stringify(input)})

        expect(result.statusCode).toBe(400)
        expect(JSON.parse(result.body).message).toEqual('Must have a price')
    })


    // Server Error Branches
    test('will return 500 error if server cannot get pic', async () => {
        simulateDbScenario({
            getPicError: true,
            getTweetError: false,
            saveHighlightedError: false
        })

        const input = {
            id: 'product_1234',
            name: 'Coffee 1',
            price: 200
        }
        
        const result = await save({body: JSON.stringify(input)})

        expect(result.statusCode).toBe(500)
        expect(JSON.parse(result.body).message).toEqual('Img cannot be found')
    })

    test('will save highlighted with default tweet if tweets cannot be found', async () => {
        simulateDbScenario({
            getPicError: false,
            getTweetError: true,
            saveHighlightedError: false
        })

        const input = {
            id: 'product_1234',
            name: 'Coffee 1',
            price: 200
        }
        
        const result = await save({body: JSON.stringify(input)})

        expect(result.statusCode).toBe(200)
        expect(JSON.parse(result.body)).toEqual({ 
            id: 'product_1234',
            name: 'Coffee 1',
            price: 200,
            tweet: 'Default tweet message',
            pic: 'https://google.com' 
        })
    })

    test('will return 500 error if there is a problem saving', async () => {
        simulateDbScenario({
            getPicError: false,
            getTweetError: false,
            saveHighlightedError: true
        })

        const input = {
            id: 'product_1234',
            name: 'Coffee 1',
            price: 200
        }
        
        const result = await save({body: JSON.stringify(input)})

        expect(result.statusCode).toBe(500)
        expect(JSON.parse(result.body).message).toEqual('Could not save highlighted')
    })
})

