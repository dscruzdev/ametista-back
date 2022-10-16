const express = require('express');
var bodyParser = require('body-parser')
const app = express();

require("dotenv").config();

const sms = require("./routes/sms");
const requestRoute = require("./routes/request");
const clientRoute = require("./routes/client");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        "accountSid": accountSid,
        "authToken": authToken
    }, 200)
});

app.use("/sms", sms);
app.use("/request", requestRoute);
app.use("/client", clientRoute);
app.get("/teste", async (req, res) => {
    teste = req.body;
    res.status(201).json({'message':teste});
});

// app.post("/request", (req, res) => {
//     data = req.body;

//     var pad = function (num) { return ('00' + num).slice(-2) };
//     var date = new Date();
//     date = date.getUTCFullYear() + '-' +
//         pad(date.getUTCMonth() + 1) + '-' +
//         pad(date.getUTCDate()) + ' ' +
//         pad(date.getUTCHours() - 3) + ':' +
//         pad(date.getUTCMinutes()) + ':' +
//         pad(date.getUTCSeconds());
//     request1 = new request(2, 14, "Finance", "Não recebi o boleto", date);
//     // //console.log(request1);
//     res.status(200).json(request1);
// });

app.listen(8080, () => {
    console.log('Ouvindo porta 8080');
}).on('error', (err) => {
    console.log(err);
});
