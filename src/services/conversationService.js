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

exports.fetchConversation = async (req, res) => {
    const {idRequests, cpfClients} = req.body;
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
    //precisa vir idRequest no body
    const conversation = await this.fetchConversation(req, res);
    //rules
    if (true) {
        messages = await conversationController.listMessages(conversation);
        return res.status(201).json(messages);
    }
};

exports.listConversations = async (req, res) => {
    //rules
    if (true) {
        messages = await conversationController.listConversations();
        return res.status(201).json(messages);
    }
};

exports.delete = async (req, res) => {
    const idRequests = req.params.id;
    const request = await requestController.find(idRequests, res);
    //rules
    if (true) {
        deletedConversation = await conversationController.delete("CH7f1e8951d4e545fc993ed9dcc8067bdc");
        deletedRequest = await conversationController.delete({idRequests:request.idRequests});
        return res.status(201).json({"Conversation":deletedConversation,"Request":deletedRequest});
    }
};


