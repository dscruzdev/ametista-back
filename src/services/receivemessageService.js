const receiveMessageController = require('../controllers/receivemessageController');
const sgMail = require('@sendgrid/mail')
const whatsappnumber = process.env.WHATSAPPNUMBER;
const smsnumber = process.env.SMSNUMBER;
const email = process.env.EMAIL;
const fbid = process.env.FBPAGEID;

exports.receiveMessageSMS = async (req, res) => {
    
    //rules
    if (true) {
        receivedMessage = await receiveMessageController.receiveSMS();
        res.status(200).json(sentMessage);
    }
}
