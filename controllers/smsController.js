const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.conversation = (req, res) => {
    //Create conversation
    client.conversations.v1.conversations
        .create({ friendlyName: 'SMS-to-WhatsApp Example' })
        .then(conversation => res.json({ "conversation": conversation }));
}
//Funcionou

exports.participants = (req, res) => {

    client.conversations.v1.conversations('CH8e0475d9291f4c6e9690d5d39b68439f')
    .participants
    .create({
       'messagingBinding.address': 'whatsapp:+5535998861483',
       'messagingBinding.proxyAddress': 'whatsapp:+14155238886'
     })
        .then(participant => res.json({ "participant": participant }));
}
//Funcionou

exports.participantsIdentity = (req, res) => {
    client.conversations.v1.conversations('CH53918c81bfe94d02a9bb4efeceb94c98')
        .participants
        .create({ identity: 'testPineapple' })
        .then(participant => res.json({
            "participant": participant
        }));
}
//Funcionou

exports.sendMessageConversation = (req, res) =>{ //Envia mensagem por conversation
    //No body tem que vir o conversations, author e body
    client.conversations.v1.conversations('CH8e0475d9291f4c6e9690d5d39b68439f')
    .messages
    .create({
        author: 'whatsapp:+5512991362116',
        body: 'Eu espero de verdade que isso tenha dado certo porque eu não aguento mais, PQP'
      })
      .then(message => res.json({"message": message}))
}



exports.sendMessage = (req, res) => {
    client.messages
        .create({
            body: 'Estou recebendo mensagem do Whatsapp', //Request body
            to: 'whatsapp:+5512991362116', // Request body
            from: 'whatsapp:+14155238886', //Request body
        })
        .then((message) => res.json({ "message": message }, 200));
}
//Funcionou