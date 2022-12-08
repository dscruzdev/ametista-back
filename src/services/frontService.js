const clientController = require("../controllers/clientController");
const areaController = require("../controllers/areaController");
const area_has_userController = require("../controllers/area_has_userController");
const area_has_subjectController = require("../controllers/area_has_subjectController");
const userController = require("../controllers/userController");
const requestController = require("../controllers/requestController");
const commentController = require("../controllers/commentController");
const languageController = require("../controllers/languageController");
const subjectController = require("../controllers/subjectController");
const user_has_languageController = require("../controllers/user_has_languageController");
const conversationController = require("../controllers/conversationController");
const user_has_requestsController = require("../controllers/user_has_requestController");
const logStatusRequest_has_RequestController = require("../controllers/logStatusRequest_has_RequestController");
const fbid = process.env.FBPAGEID;
const whatsapp = process.env.WHATSAPPNUMBER;
const sms = process.env.SMSNUMBER;
const email = process.env.EMAIL;

const date_n_time = require('date-and-time');
const { Op } = require("sequelize");

exports.chat = async (req, res) => {
    //const { idSubject, name, category, idLanguage } = req.body;
    //Ver quais assuntos o usuario está apto a pegar, se for admin pega todos

    //rules
    const token = req.params.token;

    const idSubject = '1,2,3';
    const idLanguage = '1,2';
    const subjects = [];
    const f3subjects = [];

    var subjectdata = idSubject.split(",");

    subjectdata.forEach((idSubjects) => {
        idSubjects = parseInt(idSubjects);
        subjects.push({ idSubjects });
        f3subjects.push(idSubjects);
    });

    const filter1 = {
        data: subjects
    };

    Object.keys(filter1).forEach(key => {
        if (filter1[key] == null) {
            delete filter1[key];
        }
    });
    const languages = [];
    const f3languages = [];

    var languagedata = idLanguage.split(",");

    languagedata.forEach((idLanguages) => {
        idLanguages = parseInt(idLanguages);
        languages.push({ idLanguages });
        f3languages.push(idLanguages);
    });

    const filter2 = {
        data: languages
    };


    if (true) {
        const subject = await subjectController.selectOr(filter1, res);

        const language = await languageController.selectOr(filter2, res);

        const filter3 = { idSubject: f3subjects, idLanguage: f3languages, status: "open" };

        const request = await requestController.selectOr2(filter3, res);
        //status

        var clientscpfs = [];
        var requestsids = [];

        request.forEach((index) => {
            const cpfClients = index.cpfClients;
            const idRequests = index.idRequests;
            clientscpfs.push({ cpfClients });
            requestsids.push({ idRequests });

        });

        const filter4 = {
            data: clientscpfs
        };

        const filter5 = {
            data: requestsids
        };

        client = await clientController.selectOr(filter4, res);

        comment = await commentController.selectOr(filter5, res);

        //messages
        var response = [];
        client.forEach(data1 => {
            var hisrequests = [];
            request.forEach(data2 => {
                var varforlanguage;
                var varforsubject;
                var hiscomments = [];
                var hismessages = [];
                var messages = [];
                language.forEach(data3 => {
                    if (data3.idLanguages == data2.idLanguage) {
                        varforlanguage = data3.language;
                    }
                })
                subject.forEach(data3 => {
                    if (data3.idSubjects == data2.idSubject) {
                        varforsubject = data3.name;
                    }
                })
                comment.forEach(data3 => {
                    if (data3.idRequests == data2.idRequests) {
                        hiscomments.push(data3);
                    }
                });
                // message.forEach(data4 => {
                //     if (data4.messageID == data2.something) {
                //         hismessages.push(data4);
                //     }
                // });
                data2.dataValues.comments = hiscomments;
                data2.dataValues.language = varforlanguage;
                data2.dataValues.subject = varforsubject;

                if (data1.cpfClients == data2.cpfClients) {
                    hisrequests.push(data2);
                }
            });
            data1.dataValues.requests = hisrequests;

            response.push(data1);
        });
        return res.status(200).json(response);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.frontticket = async (req, res) => {
    //const { idSubject, name, category, idLanguage } = req.body;
    //Ver quais assuntos o usuario está apto a pegar, se for admin pega todos
    //rules
    var id = req.params.id;
    const idSubject = '1,2,3';
    const idLanguage = '1,2';
    const subjects = [];
    const f3subjects = [];
    id = id.split("?")[0]
    var subjectdata = idSubject.split(",");

    subjectdata.forEach((idSubjects) => {
        idSubjects = parseInt(idSubjects);
        subjects.push({ idSubjects });
        f3subjects.push(idSubjects);
    });

    const filter1 = {
        data: subjects
    };

    Object.keys(filter1).forEach(key => {
        if (filter1[key] == null) {
            delete filter1[key];
        }
    });
    const languages = [];
    const f3languages = [];

    var languagedata = idLanguage.split(",");

    languagedata.forEach((idLanguages) => {
        idLanguages = parseInt(idLanguages);
        languages.push({ idLanguages });
        f3languages.push(idLanguages);
    });

    const filter2 = {
        data: languages
    };


    if (true) {
        const subject = await subjectController.selectOr(filter1, res);

        const language = await languageController.selectOr(filter2, res);

        const filter3 = { idRequests: id };

        const request = await requestController.select(filter3, res);
        //status

        var clientscpfs = [];
        var requestsids = [];

        request.forEach((index) => {
            const cpfClients = index.cpfClients;
            const idRequests = index.idRequests;
            clientscpfs.push({ cpfClients });
            requestsids.push({ idRequests });

        });

        const filter4 = {
            data: clientscpfs
        };

        const filter5 = {
            data: requestsids
        };

        client = await clientController.selectOr(filter4, res);

        comment = await commentController.selectOr(filter5, res);

        //messages
        var response = [];
        client.forEach(data1 => {
            var hisrequests = [];
            request.forEach(data2 => {
                var varforlanguage;
                var varforsubject;
                var hiscomments = [];
                var hismessages = [];
                var messages = [];
                language.forEach(data3 => {
                    if (data3.idLanguages == data2.idLanguage) {
                        varforlanguage = data3.language;
                    }
                })
                subject.forEach(data3 => {
                    if (data3.idSubjects == data2.idSubject) {
                        varforsubject = data3.name;
                    }
                })
                comment.forEach(data3 => {
                    if (data3.idRequests == data2.idRequests) {
                        hiscomments.push(data3);
                    }
                });
                // message.forEach(data4 => {
                //     if (data4.messageID == data2.something) {
                //         hismessages.push(data4);
                //     }
                // });
                data2.dataValues.comments = hiscomments;
                data2.dataValues.language = varforlanguage;
                data2.dataValues.subject = varforsubject;

                if (data1.cpfClients == data2.cpfClients) {
                    hisrequests.push(data2);
                }
            });
            data1.dataValues.requests = hisrequests;

            response.push(data1);
        });
        return res.status(200).json(response);
    } else {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }
}

exports.updateinfos = async (req, res) => {
    const { cpfClients, name, email, subject, language, idRequests, phone, description } = req.body;

    const clientbody = {
        cpfClients: cpfClients,
        name: name,
        email: email,
        phone: phone
    };


    const requestbody = {
        idRequests: idRequests,
        idSubject: subject,
        idLanguage: language,
        description: description
    };
    console.log(requestbody)

    const client = await clientController.update(clientbody, res);

    const request = await requestController.update(requestbody, res);

    return res.status(201).json({ "client": client, "request": request });

}

exports.makecomment = async (req, res) => {
    const body = req.body;

    const comments = await commentController.create(body, res);

    return res.status(201).json(comments);
}

exports.endrequest = async (req, res) => {
    const body = req.body;

    var date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' +
        ('00' + date.getUTCHours()).slice(-2) + ':' +
        ('00' + date.getUTCMinutes()).slice(-2) + ':' +
        ('00' + date.getUTCSeconds()).slice(-2);
    //UTC 0

    //body = { endedAt: }
    const request = [];
    const idRequests = body.idRequests.split(",");
    idRequests.forEach((idRequest) => {
        data = {
            endedAt: date,
            status: 'Fechado',
            idRequests: idRequest
        }
        request.push(requestController.update(data, res));
    });
    const lastrequest = await requestController.find(idRequests[idRequests.length - 1]);
    switch (lastrequest.idChannels) {
        case 1:

            conversationController.endrequest(lastrequest.SID, "messenger:" + fbid, "messenger:" + lastrequest.to, lastrequest.idRequests);

            break;
        case 2:
            conversationController.endrequest(lastrequest.SID, "whatsapp:" + whatsapp, "whatsapp:" + lastrequest.to, lastrequest.idRequests);
            break;
        case 3:
            conversationController.endrequest(lastrequest.SID, sms, lastrequest.to, lastrequest.idRequests);
            break;
        case 4:
            console.log("EMAIL");
            console.log(email);
            break;
        default:
            break;
    }


    return res.status(201).json(request);
}

exports.requests = async (req, res) => {
    const body = req.body;
    var requests;
    var idRequest;
    if (req.query.id) {
        const base = await requestController.select({ idRequests: idRequest }, res);
        requests = await requestController.select({ cpfClients: base[0].cpfClients }, res);
    } else {
         requests = await requestController.select();
    }

    const subjects = await subjectController.select();

    const clients = await clientController.select();

    requests.forEach(request => {
        var varforsubject;
        subjects.forEach(data3 => {
            if (data3.idSubjects == request.idSubject) {
                varforsubject = data3.name;
            }
        })
        var varforclient;
        clients.forEach(data3 => {
            if (data3.cpfClients == request.cpfClients) {
                varforclient = data3.name;
            }
        });
        var date = new Date(request.dataValues.createdAt);
        //temp_order_date[2] = temp_order_date[2].split("T");
        const order_date = date_n_time.format(date, "DD/MM/YYYY");
        const order_time = date_n_time.format(date, "HH:mm");
        request.dataValues.subject = varforsubject;
        request.dataValues.client = varforclient;
        request.dataValues.order_date = order_date;
        request.dataValues.order_time = order_time;
    });


    return res.status(200).json(requests);

}

exports.others = async (req, res) => {
    const body = req.body;

    const areas = await areaController.select();

    const area_has_subjects = await area_has_subjectController.select();

    const subjects = await subjectController.select();

    const languages = await languageController.select();

    const others = [

    ];

    areas.forEach(area => {
        area.dataValues.type = "Área";
        var date = new Date(area.dataValues.createdAt);
        area.dataValues.createddate_on = date_n_time.format(date, "DD/MM/YYYY");
        area.dataValues.createdtime_on = date_n_time.format(date, "HH:mm");
        others.push(area);
    });

    subjects.forEach(subject => {
        const subjectareas = [];
        area_has_subjects.forEach(area_has_subject => {
            if (area_has_subject.idSubjects == subject.idSubjects) {
                areas.forEach(area => {
                    if (area.idAreas == area_has_subject.idAreas) {
                        subjectareas.push({ value: area.idAreas, label: area.name });
                    }
                });

            }
        });
        subject.dataValues.type = "Assunto";
        var date = new Date(subject.dataValues.createdAt);
        subject.dataValues.createddate_on = date_n_time.format(date, "DD/MM/YYYY");
        subject.dataValues.createdtime_on = date_n_time.format(date, "HH:mm");
        subject.dataValues.areas = subjectareas;
        others.push(subject)
    })

    languages.forEach(language => {
        language.dataValues.type = "Idioma";
        var date = new Date(language.dataValues.createdAt);
        language.dataValues.createddate_on = date_n_time.format(date, "DD/MM/YYYY");
        language.dataValues.createdtime_on = date_n_time.format(date, "HH:mm");
        others.push(language)
    })

    return res.status(200).json(others);
}

exports.employees = async (req, res) => {
    const body = req.body;

    const users = await userController.select();

    const areas = await areaController.select();

    const area_has_users = await area_has_userController.select();



    users.forEach(user => {
        user.dataValues.area = "";
        area_has_users.forEach(area_has_user => {
            areas.forEach(area => {
                if (area.idAreas == area_has_user.idAreas && user.cpfUsers == area_has_user.cpfUsers) {
                    user.dataValues.area += area.name + ", ";
                }
            });
        }
        )
        var date = new Date(user.dataValues.createdAt);
        //temp_order_date[2] = temp_order_date[2].split("T");
        const order_date = date_n_time.format(date, "DD/MM/YYYY");
        const order_time = date_n_time.format(date, "HH:mm");
        user.dataValues.order_date = order_date;
        user.dataValues.order_time = order_time;
        user.dataValues.area = user.dataValues.area.slice(0, user.dataValues.area.length - 2);
    });
    return res.status(200).json(users);
}

exports.modals = async (req, res) => {
    const body = req.body;

    const languages = await languageController.select();

    const areas = await areaController.select();

    const users = await userController.select();

    const area_has_users = await area_has_userController.select();

    const user_has_languages = await user_has_languageController.select();

    const response = {
        languages: languages, areas: areas, users: users, area_has_users: area_has_users, user_has_languages: user_has_languages
    }

    return res.status(200).json(response);
}
exports.clientrequests = async (req, res) => {
    const idRequest = req.query.id;

    const base = await requestController.select({ idRequests: idRequest }, res);
    const requests = await requestController.select({ cpfClients: base[0].cpfClients }, res);

    return res.status(200).json(requests);
}
exports.messages = async (req, res) => {
    const idRequests = req.params.id;
    const uid = req.query.uid;

    if (true) {
        const request = await requestController.find(idRequests);
        if(request.idChannels == 4){
            return res.status(200).json({"message":"nothing to return"});
        }
        const messages = await conversationController.listMessages(request.SID);
        const user = await userController.findByUid(uid);
        const client = await clientController.findByPK(request.cpfClients);
        const messagesresponse = [];

        function addZero(i) {
            if (i < 10) { i = "0" + i }
            return i;
        }
        var from, to;
        const clientData = {
            id: client.uid,
            name: client.name.split(" ")[0],
            //avatar: string;
            lastMessage: "",
            totalUnread: 0,
            lastMessageOn: "",
            email: client.email,
            phone: client.phone,
            //location: string;
            //languages: string;
            //subject: string;
        };
        const userData = {
            id: "f79b3375-257b-420a-af19-913162987b77",
            name: user.name.split(" ")[0],
            //avatar: string;
            lastMessage: "",
            totalUnread: 0,
            lastMessageOn: "",
            email: user.email,
            phone: user.phone,
            //location: string;
            //languages: string;
            //subject: string;
        }

        messages.forEach(message => {
            if (message.author == fbid) {
                from = userData;
                to = clientData;
            } else {
                from = clientData;
                to = userData;
            }

            messagesresponse.push({ "from": from, "to": to, "message": { "type": "text", "value": message.body }, "sendOn": addZero(message.dateCreated.getHours()) + ":" + addZero(message.dateCreated.getMinutes()) });
            clientData.lastMessage = message.body;
            clientData.lastMessageOn = addZero(message.dateCreated.getHours()) + ":" + addZero(message.dateCreated.getMinutes());
        });

        return res.status(200).json(messagesresponse);
    } else {
        return res.status(403).json({ "message": "Unauthorized" });
    }
}

exports.inicio = async (req, res) => {


    const requests = await requestController.select(null, res);
    const logstatusrequest_has_request = await logStatusRequest_has_RequestController.select(null, res);
    function semfdata() {
        var metricas = {
            NPS: {
                porcentagem: {
                    detratores: 0,
                    neutros: 0,
                    promotores: 0,
                },
                detratores: 0,
                neutros: 0,
                promotores: 0,
                total: 0,
            },
            CSAT: {
                porcentagem: {
                    5: 0,
                    4: 0,
                    3: 0,
                    2: 0,
                    1: 0
                },
                5: 0,
                4: 0,
                3: 0,
                2: 0,
                1: 0,
                total: 0,
            },
            channels: {
                porcentagem: {
                    whatsapp: 0,
                    messenger: 0,
                    SMS: 0,
                    email: 0,
                },
                whatsapp: 0,
                messenger: 0,
                SMS: 0,
                email: 0,
            },
            requests: {
                porcentagem: {
                    open: 0,
                    going: 0,
                    ended: 0,
                },
                open: 0,
                going: 0,
                ended: 0,
                total: 0,
            },
        };
        logstatusrequest_has_request.forEach((logstatusrequest) => {
            if (logstatusrequest.idStatusRequests == 1) {
                metricas.requests.open++;
            }
            if (logstatusrequest.idStatusRequests == 2) {
                metricas.requests.going++;
            }
            if (logstatusrequest.idStatusRequests == 3) {
                metricas.requests.ended++;
            }
        });
        requests.forEach((request) => {
            if ((request.NPS >= 0 || request.NPS <= 6) && request.NPS != null) {
                metricas.NPS.detratores++;
            }
            if ((request.NPS >= 7 || request.NPS <= 8) && request.NPS != null) {
                metricas.NPS.neutros++;
            }
            if ((request.NPS >= 9 || request.NPS <= 10) && request.NPS != null) {
                metricas.NPS.promotores++;
            }
            if ((request.CSAT == 1) && request.CSAT != null) {
                metricas.CSAT[1]++;
            }
            if ((request.CSAT == 2) && request.CSAT != null) {
                metricas.CSAT[2]++;
            }
            if ((request.CSAT == 3) && request.CSAT != null) {
                metricas.CSAT[3]++;
            }
            if ((request.CSAT == 4) && request.CSAT != null) {
                metricas.CSAT[4]++;
            }
            if ((request.CSAT == 5) && request.CSAT != null) {
                metricas.CSAT[5]++;
            }
            if (request.idChannels == 1) {
                metricas.channels.messenger++;
            }
            if (request.idChannels == 2) {
                metricas.channels.whatsapp++;
            }
            if (request.idChannels == 3) {
                metricas.channels.SMS++;
            }
            if (request.idChannels == 4) {
                metricas.channels.email++;
            }
            metricas.requests.total++;
        });
        metricas.NPS.total = metricas.NPS.detratores + metricas.NPS.neutros + metricas.NPS.promotores;
        metricas.CSAT.total = metricas.CSAT[1] + metricas.CSAT[2] + metricas.CSAT[3] + metricas.CSAT[4] + metricas.CSAT[5];
        if (metricas.NPS.total != 0) {
            metricas.NPS.porcentagem.detratores = metricas.NPS.detratores / metricas.NPS.total;
            metricas.NPS.porcentagem.neutros = metricas.NPS.neutros / metricas.NPS.total;
            metricas.NPS.porcentagem.promotores = metricas.NPS.promotores / metricas.NPS.total;
        }

        if (metricas.CSAT.total != 0) {
            metricas.CSAT.porcentagem[1] = metricas.CSAT[1] / metricas.CSAT.total;
            metricas.CSAT.porcentagem[2] = metricas.CSAT[2] / metricas.CSAT.total;
            metricas.CSAT.porcentagem[3] = metricas.CSAT[3] / metricas.CSAT.total;
            metricas.CSAT.porcentagem[4] = metricas.CSAT[4] / metricas.CSAT.total;
            metricas.CSAT.porcentagem[5] = metricas.CSAT[5] / metricas.CSAT.total;
        }

        if (metricas.requests.total != 0) {
            metricas.channels.porcentagem.whatsapp = metricas.channels.whatsapp / metricas.requests.total;
            metricas.channels.porcentagem.email = metricas.channels.email / metricas.requests.total;
            metricas.channels.porcentagem.SMS = metricas.channels.SMS / metricas.requests.total;
            metricas.channels.porcentagem.messenger = metricas.channels.messenger / metricas.requests.total;
            metricas.requests.porcentagem.going = metricas.requests.going / metricas.requests.total;
            metricas.requests.porcentagem.open = metricas.requests.open / metricas.requests.total;
            metricas.requests.porcentagem.ended = metricas.requests.ended / metricas.requests.total;
        }
        return metricas;
    }
    function comfdata() {
        requests.forEach((request) => {
            var reabertura = 0;
            requests.forEach(request => {
                var fechamento;
                logstatusrequest_has_request.forEach(relacao => {
                    if (relacao.idRequests == request.idRequests) {
                        console.log(fechamento);
                        if (relacao.idLogStatusRequests == 3) {
                            fechamento = relacao.createdAt;
                        }
                        const data_criacao = new Date(relacao.createdAt);
                        const data_teste = new Date(fechamento);
                        if (relacao.idLogStatusRequests == 1 && relacao.createdAt >= fechamento) {
                            reabertura++;
                        }
                    }
                });
            });
            logstatusrequest_has_request.forEach((logStatus) => {
                var most_recent = new Date(0);
                if ((logStatus.idRequests == request.idRequests) && (most_recent <= logStatus.createdAt)) {
                    most_recent = logStatus.createdAt;
                    switch (logStatus.idStatusRequests) {
                        case 1:
                            request.dataValues.status = "Em aberto";
                            break;
                        case 2:
                            request.dataValues.status = "Em andamento";
                            break;
                        default:
                            request.dataValues.status = "Finalizado";
                            break;
                    }
                }
            });
            switch (request.idChannels) {
                case 1:
                    request.dataValues.channelLabel = "Facebook Messenger";
                    break;
                case 2:
                    request.dataValues.channelLabel = "WhatsApp";
                    break;
                case 3:
                    request.dataValues.channelLabel = "SMS";
                    break;
                default:
                    request.dataValues.channelLabel = "Email";
                    break;
            }
        });
        return requests;
    }
    /*
    Se for usar o filtro de data na pagina inicial, peça coloque comfdata() na linha 603
    Se  não for usar o filtro de data na pagina inicial, peça coloque semfdata() na linha 603
    O melhor jeito de testar é com o postman, mas você pode dar console.log no front pra ver como acessar os dados
    */
    return res.status(200).json(comfdata());
}