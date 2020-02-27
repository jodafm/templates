require('dotenv').config();

module.exports = {
  helloWorld: function () {
    console.log(process.env.FROM_PROFILE)
    console.log(process.env.TO_PROFILE)
    console.log(process.env.SLS_ORG)
    console.log(process.env.TOKEN)
  },
  helloWorld2: function () {
  }
};

const consoleCommand = {helloWorld: "node -e 'require(\"./index\").helloWorld()'"}