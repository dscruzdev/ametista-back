const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.newConversation = async (idRequests) => { //Envia mensagem por conversation
    return client.conversations.v1.conversations
        .create({ friendlyName: idRequests })
        .then(conversation => { return conversation.sid });
}

exports.fetchConversation = async (sid) => {
    return client.conversations.v1.conversations(sid)
        .fetch()
        .then(conversation => { return conversation });
}

exports.newParticipantSMS = async (sid, from, to) => {
    return client.conversations.v1.conversations(sid)
        .participants
        .create({
            'messagingBinding.address': to,
            'messagingBinding.proxyAddress': from
        })
        .then(participant => { return participant });
}

exports.newParticipantWhatsapp = async (sid, from, to) => {
    console.log(sid);
    console.log("----------------------------");
    console.log(from);
    console.log("----------------------------");
    console.log(to);
    return client.conversations.v1.conversations(sid)
        .participants
        .create({
            'messagingBinding.address': 'whatsapp:' + to,
            'messagingBinding.proxyAddress': 'whatsapp:' + from
        })
        .then(participant => { return participant });
}

exports.newParticipantMessenger = async (sid, from, to) => {
    return client.conversations.v1.conversations(sid)
        .participants
        .create({
            'messagingBinding.address': 'messenger:' + to,
            'messagingBinding.proxyAddress': 'messenger:' + from
        })
        .then(participant => { return participant });
}

exports.listMessages = async (sid) => {
    return await client.conversations.v1.conversations(sid)
        .messages.list()
        .then(messages => { return messages });;
}

exports.listConversations = async () => {
    return client.conversations.v1.conversations
        .list()
        .then(conversations => { return conversations });
}

exports.sendMessage = async (author, sid, body) => {
    return client.conversations.v1.conversations(sid)
        .messages
        .create({ author: author, body: body })
        .then(message => { return message });
}

exports.delete = async (sid) => {
    return client.conversations.v1.conversations(sid)
        .update({ state: 'closed' })
        .then(conversation => { return conversation });

    return client.conversations.v1.conversations(sid)
        .remove();
}

exports.endrequest = async (sid, from, to, idRequests) => {
    client.studio.v2.flows('FW6bb2a0c6cb0be4f59aaf0c5869e01799')
        .executions.create({parameters:{idRequests:idRequests},to:to, from:from}).then(execution => {return 0});
    return client.conversations.v1.conversations(sid)
        .update({ state: 'closed' })
        .then(conversation => { return conversation });

}