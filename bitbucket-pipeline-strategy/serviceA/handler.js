const moment = require('moment')
module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify({
        date: moment() + '_A_' + process.env.STAGE
    })
  }
}
