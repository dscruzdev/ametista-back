const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendMessageWhatsapp = (from, to, body) => { //Envia mensagem por conversation
    //No body tem que vir o conversations, author e body
    client
        .messages
        .create({
            from: from,
            body: body,
            to: to
        })
        .then(message => { return message; });
}

exports.sendMessageSMS = (from, to, body) => {
    return client.messages
        .create({
            body: body, //Request body
            to: to, // Request body
            from: from, //Request body
        })
        .then((message) => { return message; });
}

exports.sendMessageEmail = async (msg) => {
    return sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
            return (200);
        })
        .catch((error) => {
            console.error(error)
            return (error);
        })
}

exports.sendMessageMessenger = async (from, to, body) => {
    return client.messages
        .create({
            from: '107247788842243',
            body: 'Would you like to play a game?',
            to: '8900577156634689'
        })
        .then(message => { return message; });
}
//813380746664115