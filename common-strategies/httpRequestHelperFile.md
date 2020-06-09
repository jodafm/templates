## Make Http Requests into a simplified helper file

Why?

You can simplify the `request.get` syntax a lot more if you create a helper file which uses async/await

Before:

```jsx
request.get({
  "headers": {
    "Authorization": auth,
    "content-type": "application/json",
    "Accept": "application/json",
    "client_id": client_id,
    "client_secret": client_secret
  },

  "url": countryCodeURL,
  "body": ''
}, (error, response, body) => {
  if (error) {
    console.log("There is some error from EIP");
    resolve({
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "X-Content-Type-Options": "nosniff",
        "X-XSS-Protection": "1;mode=block",
        "Strict-Transport-Security": "max-age=63072000"
      },
      body: JSON.stringify(error)
    });
  }
  else {
    console.log("Inside success section of request.get");
  }
})
```

After:

The handler.js (or index.js) file

```jsx
const { getRequest, serverSuccess, serverError } = require('../helpers/http');

exports.handler = async event => {
  try {
    let response = await getRequest({
      headers,
      url,
      body
    });
    return serverSuccess(response);
  } catch (err) {
    return serverError(err);
  }
}
```

And the helper file

```jsx
const request = require('request');

const http = {};

http.serverError = mainResObject => ({
  statusCode: 500,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "1;mode=block",
    "Strict-Transport-Security": "max-age=63072000"
  },
  body: JSON.stringify(mainResObject)
});

http.success = mainResObject => ({
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "1;mode=block",
    "Strict-Transport-Security": "max-age=63072000"
  },
  body: JSON.stringify(mainResObject)
});

http.getRequest = (params, method) => {
  return new Promise((resolve, reject) => {
    request.get(params, (err, res, body) => {
      if(err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
};

module.exports = http;
```
