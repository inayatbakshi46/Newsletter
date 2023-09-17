const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
require('dotenv').config({ path: './data.env' });

const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
      FNAME: fname,
      LNAME: lname
    }
   }
  ]
};
var jsonData = JSON.stringify(data);
const api_key = process.env.API;
const url = "https://us17.api.mailchimp.com/3.0/lists/1c9abfdcbe";
const options = {
  method: "POST",
  auth: "inayat05:" + api_key,
};

const request = https.request(url, options, (response) => {
  var status = response.statusCode;
  if(status === 200) {
    res.sendFile(__dirname + "/success.html");
  }else{
    res.sendFile(__dirname + "/fail.html")
  }
response.on("data", (data) => {
    console.log(JSON.parse(data));
  });
});
  request.write(jsonData);
  request.end();
});
app.post("/failure", (req, res) => {
  res.redirect("/")
});
app.listen(process.env.PORT || 3000, () => {
  console.log("server has started!!");
});
