const conversationController = require('../controllers/conversationController');
const userController = require('../controllers/userController');
const sgMail = require('@sendgrid/mail')
const whatsappnumber = process.env.WHATSAPPNUMBER;
const smsnumber = process.env.SMSNUMBER;
const email = process.env.EMAIL;
const fbid = process.env.FBPAGEID;

// exports.sendMessageWhatsapp = (req, res) => { //Envia mensagem por conversation
//     data = req.body;
//     from = 'whatsapp:' + whatsappnumber;
//     to = 'whatsapp:+55' + data.to;
//     body = data.body;
//     //rules
//     if (true) {
//         sentMessage = sendMessageController.sendMessageSMS(from, to, body);
//         res.status(200).json(sentMessage);
//     }
// }

// exports.sendMessageSMS = async (req, res) => {
//     data = req.body;
//     const to = data.to;
//     const body = data.body;
//     //rules
//     if (true) {
//         sentMessage = await sendMessageController.sendMessageSMS(smsnumber, to, body);
//         res.status(200).json(sentMessage);
//     }
// }

// exports.sendMessageEmail = async (req, res) => {
//     data = req.body

//     const msg = {
//         to: data.to, // Change to your recipient
//         from: email, // Change to your verified sender
//         subject: data.subject,
//         text: data.body,
//         //html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//     }
//     //Rules
//     if (true) {
//         sentMessage = await sendMessageController.sendMessageEmail(msg);
//         if (sentMessage == 200)
//             res.status(200).json({ "message": "Email sent" });
//         else
//             res.status(sentMessage.code).json(sentMessage);
//     }
// }

exports.sendMessageMessenger = async (req, res) => {
    const {user, idRequests, body} = req.body;

    author = userController.selectOne({uid: user});

    to = 'messenger:' + data.to; // Change to your recipient
    author = 'messenger:' + fbid; // Change to your verified sender
    body = data.body;
    //html: '<strong>and easy to do anywhere, even with Node.js</strong>',

    //Rules
    if (true) {
        sentMessage = await conversationController.sendMessage(author, sid, body);

        return res.status(200).json(sentMessage);

        //res.status(sentMessage.code).json(sentMessage);
    }
}

