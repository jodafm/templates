require('dotenv').config();
const axios = require('axios').default;

module.exports = {
  joinArrays: function (fromArray, toArray, sorter) {
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
    const result = await axios.get(
      `https://api.serverless.com/core/tenants/${process.env.SLS_ORG}/deploymentProfiles/${profile}`,
      { headers: { Authorization: `bearer ${process.env.TOKEN}` }}
    );
    return result.data;
  },

  patchParams: async function (requestBody) {
    const result = await axios.patch(
      `https://api.serverless.com/core/tenants/${process.env.SLS_ORG}/deploymentProfiles/${process.env.TO_PROFILE}`, 
      requestBody,
      { headers: { Authorization: `bearer ${process.env.TOKEN}` }}
    );
    return result;
  },

  copyParams: async function () {
    // get params for 'From' profile and 'To' profile
    const fromParamsObj = await this.getParams(process.env.FROM_PROFILE);
    const toParamsObj = await this.getParams(process.env.TO_PROFILE);
    // join params and safeguards while deleting incoming 'From' values with duplicate names
    const paramList = this.joinArrays(fromParamsObj.secrets, toParamsObj.secrets, "secretName");
    const safeguardList = this.joinArrays(fromParamsObj.safeguardsPolicies, toParamsObj.safeguardsPolicies, "title");
    // PATCH new results to 'To' profile
    let requestObj = toParamsObj;
    requestObj.secrets = paramList;
    requestObj.safeguardsPolicies = safeguardList;
    const result = await this.patchParams(requestObj);
    console.log(result.data);
    return result.data;
  }
};

const consoleCommand = {copyParams: "node -e 'require(\"./index\").copyParams()'"}