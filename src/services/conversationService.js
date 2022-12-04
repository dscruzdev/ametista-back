const conversationController = require('../controllers/conversationController');
const requestController = require('../controllers/requestController');
const clientController = require('../controllers/clientController');
const sgMail = require('@sendgrid/mail')
const whatsappnumber = process.env.WHATSAPPNUMBER;
const smsnumber = process.env.SMSNUMBER;
const fbid = process.env.FBPAGEID;
var imaps = require('imap-simple');
var Imap = require('node-imap'),
    inspect = require('util').inspect;
var fs = require('fs'), fileStream;
const _ = require('lodash');
const { json } = require('body-parser');
const simpleParser = require('mailparser').simpleParser;

exports.newConversation = async (req, res) => {
    const { idRequests } = req.body;
    //rules
    if (true) {
        conversation = await conversationController.newConversation(idRequests);
        res.status(201).json(conversation);
    }
};

exports.sendMessage = async (req, res) => {
    const { idRequests, body } = req.body;
    const request = await requestController.find(idRequests, res);
    //rules
    if (true) {
        conversation = await conversationController.sendMessage(fbid, request.SID, body);
        res.status(201).json(conversation);
    }
};

exports.fetchConversation = async (req, res) => {
    const { idRequests } = req.body;
    const request = await requestController.select({ idRequests: idRequests }, res);
    //rules
    if (true) {
        conversation = await conversationController.fetchConversation(request.SID);
        res.status(200).json(conversation);
    }
};

exports.newParticipantSMS = async (req, res) => {
    const { idRequests } = req.body;
    const request = await requestController.select({ idRequests: idRequests }, res);
    const client = await clientController.select({ cpfClients: request.idRequests }, res);

    //rules
    if (true) {
        conversation = await conversationController.newParticipantSMS(request.SID, smsnumber, client.phone);
        return res.status(201).json(conversation);
    }
};

exports.newParticipantWhatsapp = async (req, res) => {
    const { idRequests } = req.body;
    const request = await requestController.select({ idRequests: idRequests }, res);
    const client = await clientController.select({ cpfClients: request.idRequests }, res);

    //rules
    if (true) {
        conversation = await conversationController.newParticipantWhatsapp(request.SID, whatsappnumber, client.phone);
        return res.status(201).json(conversation);
    }
};

exports.listMessages = async (req, res) => {
    const idRequests = req.params.id;
    //precisa vir idRequest no body
    const request = await requestController.find(idRequests, res);

    try {
        messages = await conversationController.listMessages(request.SID);

    } catch (error) {
        return res.status(error.status).json(error);

    }
    //rules
    if (true) {
        return res.status(200).json(messages);
    }
};

exports.listConversations = async (req, res) => {
    //rules
    if (true) {
        messages = await conversationController.listConversations();
        return res.status(200).json(messages);
    }
};

exports.delete = async (req, res) => {
    const idRequests = req.params.id;
    const request = await requestController.find(idRequests, res);
    //rules
    if (true) {
        deletedConversation = await conversationController.delete(request.SID);
        return res.status(201).json({ "Conversation": deletedConversation });
    }
};

exports.receivemessage = async (req, res) => {
    const body = req.body.body;

    const from = body.split("From=")[1].split(",")[0];
    const bodyMessage = body.split("Body=")[1].split(",")[0];

    //rules
    if (true) {
        deletedConversation = await conversationController.delete(request.SID);
        return res.status(201).json({ "Conversation": deletedConversation });
    }
};

exports.receiveEmail = async (req, res) => {
    const response = new Object();
    var responseArray = [];
    // var imap = new Imap({
    //     user: process.env.EMAIL,
    //     password: process.env.EMAILPASSWORD,
    //     host: process.env.EMAILHOST,
    //     port: 993,
    //     tls: true,
    // });


    var config = {
        imap: {
            user: process.env.EMAIL,
            password: process.env.EMAILPASSWORD,
            host: process.env.EMAILHOST,
            port: 993,
            tls: true,
        }
    };

    imaps.connect(config).then(function (connection) {
        return connection.openBox('INBOX').then(function () {
            var searchCriteria = ['1:2'];
            var fetchOptions = {
                bodies: ['HEADER', 'TEXT', ''],
            };
            return connection.search(searchCriteria, fetchOptions).then(function (messages) {
                messages.forEach(function (item, key) {
                    var all = _.find(item.parts, { "which": "" })
                    var id = item.attributes.uid;
                    var idHeader = "Imap-Id: " + id + "\r\n";
                    simpleParser(idHeader + all.body, (err, mail) => {
                        // access to the whole mail object
                        //console.log(mail.subject);
                        //console.log(mail.html);
                        fs.writeFile(`emails/mail${key}.html`, JSON.stringify(mail),()=>{
                            console.log(`mail ${key} on file`)
                        });
                        responseArray.push(mail.html);
                    });
                });
            });
        });
    });
    return res.status(200).json(responseArray);
}


