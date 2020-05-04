module.exports.main = async event => {
  try {
    require('@dynatrace/oneagent')({
      environmentid: '****',
      apitoken: '****',
    });
  } catch (err) {
    console.log('Failed to load OneAgent: ' + err);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!'
      }
    )
  }
}
