const fetch = require('node-fetch');

const chat = async (req, res, next) => {

  const userID = req.body.userID
  const url = `https://api-us.cometchat.io/v2.0/users/${userID}/friends`;
  const options = {
    method: 'POST',
    headers: {
      appId: '3372201956af684',
      apiKey: '242dc31a39e2d691c1947cd65a0432cae5018b8e',
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ accepted: [req.body.otherID] })
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));

}

exports.chat = chat
// const fetch = require('node-fetch');

// const chat = async (req, res, next) => {

//   const userID = req.body.userID
//   const url = `https://api-us.cometchat.io/v2.0/users/${userID}/friends`;
//   const options = {
//     method: 'POST',
//     headers: {
//       appId: '323611fede35399',
//       apiKey: '3972dfed09f25aabc875f5e613e862b39db70fca',
//       'Content-Type': 'application/json',
//       Accept: 'application/json'
//     },
//     body: JSON.stringify({ accepted: [req.body.otherID] })
//   };

//   fetch(url, options)
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.error('error:' + err));

// }

// exports.chat = chat