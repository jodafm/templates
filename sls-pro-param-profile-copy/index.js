require('dotenv').config();
const axios = require('axios').default;

module.exports = {
  joinArrays: async function (fromArray, toArray, sorter) {
    let finalArray = toArray;
    fromArray.forEach( forItem => {
      let isDuplucate = false;
      for (var i = 0; i < toArray.length; ++i) {
        if (toArray[i][sorter] === forItem[sorter]) {
          isDuplucate = true;
          break;
        }
      }
      if (!isDuplucate) {
        finalArray.push(forItem);
      }
    })
    return finalArray;
  },
  getParams: async function (profile) {
    console.log("Getting params:")
    const result = await axios.get(
      `https://api.serverless.com/core/tenants/${process.env.SLS_ORG}/deploymentProfiles/${profile}`,
      { headers: { Authorization: `bearer ${process.env.TOKEN}` }}
    );
    return result.data;
  },
  copyParams: async function () {
    console.log("Started copyParams function:")
    const fromParamsObj = await this.getParams(process.env.FROM_PROFILE);
    const toParamsObj = await this.getParams(process.env.TO_PROFILE);
    const paramList = await this.joinArrays(fromParamsObj.secrets, toParamsObj.secrets, "secretName");
    const safeguardList = await this.joinArrays(fromParamsObj.safeguardsPolicies, toParamsObj.safeguardsPolicies, "title");
    console.log(paramList);
    console.log(safeguardList);
  }
};

const consoleCommand = {helloWorld: "node -e 'require(\"./index\").helloWorld()'"}

// secretName
