var request = require("request");
var messageData = {
  from: "{your free test number}",
  to: ["{To number}"],
  body: "This is a test message from your Sinch account",
};
var options = {
  method: "POST",
  url: "https://us.sms.api.sinch.com/xms/v1/{service_plan_id}/batches",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: "Bearer {your token}",
  },
  body: JSON.stringify(messageData),
};

request(options, function (error, response, body) {
  console.log(response.body);
  if (error) throw new Error(error);
  console.log(body);
});

const http = require("http");
const server = http.createServer((req, res) => {
  let data = [];
  req.on("data", (chunk) => {
    data.push(chunk);
  });
  req.on("end", () => {
    console.log(JSON.parse(data));
  });
  res.end();
});
server.listen(3000);