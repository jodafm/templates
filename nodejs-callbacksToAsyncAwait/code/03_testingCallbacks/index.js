module.exports.manyCallbacks = (cb) => {
    cb(1)
    cb(1)
    cb(1)
}


module.exports.callbackWithError = (cb) => {
    try {
        // throw new Error('Forced Error')

        let x = word
        cb({
            data: 100
        })
    } catch (e) {
        cb(e)
    }
}