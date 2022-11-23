const conversationController = require('../controllers/conversationController');
const requestController = require('../controllers/requestController');
const clientController = require('../controllers/clientController');
const sgMail = require('@sendgrid/mail')
const whatsappnumber = process.env.WHATSAPPNUMBER;
const smsnumber = process.env.SMSNUMBER;
const email = process.env.EMAIL;
const fbid = process.env.FBPAGEID;

exports.newConversation = async (req, res) => {
    const {idRequests} = req.body;
    //rules
    if (true) {
        conversation = await conversationController.newConversation(idRequests);
        res.status(201).json(conversation);
    }
};

exports.sendMessage = async (req, res) => {
    const {idRequests, body} = req.body;
    const request = await requestController.find(idRequests,res);
    //rules
    if (true) {
        conversation = await conversationController.sendMessage("fbid", request.SID, body);
        res.status(201).json(conversation);
    }
};

exports.fetchConversation = async (req, res) => {
    const {idRequests} = req.body;
    const request = await requestController.select({idRequests:idRequests}, res);
    //rules
    if (true) {
        conversation = await conversationController.fetchConversation(request.SID);
        res.status(200).json(conversation);
    }
};

exports.newParticipantSMS = async (req, res) => {
    const {idRequests} = req.body;
    const request = await requestController.select({idRequests:idRequests}, res);
    const client = await clientController.select({cpfClients: request.idRequests}, res);

    //rules
    if (true) {
        conversation = await conversationController.newParticipantSMS(request.SID, smsnumber, client.phone);
        return res.status(201).json(conversation);
    }
};

exports.newParticipantWhatsapp = async (req, res) => {
    const {idRequests} = req.body;
    const request = await requestController.select({idRequests:idRequests}, res);
    const client = await clientController.select({cpfClients: request.idRequests}, res);

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
    //rules
    if (true) {
        messages = await conversationController.listMessages(request.SID);
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
        return res.status(201).json({"Conversation":deletedConversation});
    }
};

exports.receivemessage = async (req, res) => {
    const body = req.body.body;
    
    const from = body.split("From=")[1].split(",")[0];
    const bodyMessage = body.split("Body=")[1].split(",")[0];
    
    //rules
    if (true) {
        deletedConversation = await conversationController.delete(request.SID);
        return res.status(201).json({"Conversation":deletedConversation});
    }
};


