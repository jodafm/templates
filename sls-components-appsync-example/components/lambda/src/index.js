// test layer dependency
const dyna = require('@dynatrace/oneagent');
const AWSXRay = require('aws-xray-sdk');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const lokijs = require('lokijs');
const md5 = require('md5');

// return Users to test appsync response
exports.handler = async event => {
    let users = [
        {
            name: "ryan"
        },
        {
            name: "tyler"
        }
    ];
    return users;
};