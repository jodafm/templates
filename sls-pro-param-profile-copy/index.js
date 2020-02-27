require('dotenv').config();
const axios = require('axios').default;

module.exports = {
  getParams: async function () {
    console.log("Getting params:")
    const result = await axios.get(
      `https://api.serverless.com/core/tenants/${process.env.SLS_ORG}/deploymentProfiles/${process.env.FROM_PROFILE}`,
      { headers: { Authorization: `bearer ${process.env.TOKEN}` }}
    );
    return result;
  },
  copyParams: async function () {
    console.log("Started copyParams function:")
    const test = await this.getParams();
    console.log("DONE");
    console.log(test.data);
  }
};

const consoleCommand = {helloWorld: "node -e 'require(\"./index\").helloWorld()'"}