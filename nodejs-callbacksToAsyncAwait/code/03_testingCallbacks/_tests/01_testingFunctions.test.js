const handler = require('../index')

describe('callbackWithError', () => {
    test.skip('will first run the test, then run it a second time with error', (done) => {
        handler.callbackWithError((x) => {
            console.log('Test is run')
            expect(x.data).toBeTruthy()
            expect(x.data).toBe(1)
            done()
        })
    })
})

describe('callbackWithError', () => {
    test.skip('will first run the test, then run it a second time with error', async () => {
        const result = await handler.asyncAwaitFunction()
        expect(result.data).toBeTruthy()
        expect(result.data).toBe(1)
    })
})