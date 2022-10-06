const request = require("./routes/request");

exports.create = (req, res) => {
    //send to database
    data = req.body;

    var pad = function (num) { return ('00' + num).slice(-2) };
    var date = new Date();
    date = date.getUTCFullYear() + '-' +
        pad(date.getUTCMonth() + 1) + '-' +
        pad(date.getUTCDate()) + ' ' +
        pad(date.getUTCHours() - 3) + ':' +
        pad(date.getUTCMinutes()) + ':' +
        pad(date.getUTCSeconds());
    request1 = new request(2, 14, "Finance", "Não recebi o boleto", date);
    // //console.log(request1);
    res.status(200).json(request1);
}