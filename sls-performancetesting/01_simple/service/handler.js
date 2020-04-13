module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        data: 200
      }
    )
  }
}
