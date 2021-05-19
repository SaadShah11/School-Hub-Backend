const fetch = require('node-fetch');

const userID;
const otherID;

const url = `https://api-us.cometchat.io/v2.0/users/{userID}/friends`;
const options = {
  method: 'POST',
  headers: {
    appId: '323611fede35399',
    apiKey: '3972dfed09f25aabc875f5e613e862b39db70fca',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({accepted: [otherID]})
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));