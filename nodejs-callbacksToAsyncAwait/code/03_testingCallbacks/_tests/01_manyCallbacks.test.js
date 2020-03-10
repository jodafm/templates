const action = require('../index')
describe('manyCallbacks', () => {
    test.skip('will run test multiple times', (done) => {
        action.manyCallbacks((x) => {
            console.log('HERE')
            expect(x).toBe(1)
            done()
        })
    })
})


describe('callbackWithError', () => {
    test.skip('will first run the test, then run it a second time with error', (done) => {

        action.callbackWithError((x) => {
            console.log('HERE')
            expect(x).toBe(1)
            done()
        })

    })
})