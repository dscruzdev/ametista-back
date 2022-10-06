const express = require('express');
var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());

require("dotenv").config();

const sms = require("./routes/sms");
const request = require("./routes/request");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.get('/', (req, res) => {
    res.json({
        "accountSid": accountSid,
        "authToken": authToken
    }, 200)
});

app.use("/sms", sms);
//app.use("/request", request)

app.listen(8080, () => {
    console.log('Ouvindo porta 8080');
}).on('error', (err) => {
    console.log(err);
});
