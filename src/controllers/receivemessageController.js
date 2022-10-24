const { MessagingResponse } = require('twilio').twiml;

exports.receiveSMS = async () => {
    const twiml = new MessagingResponse();

    twiml.message('The Robots are coming! Head for the hills!');

    return await res.type('text/xml').send(twiml.toString());
}

exports.receiveWhatsapp = async () => {
    
}