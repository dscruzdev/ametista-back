const clientController = require("../controllers/clientController");
const requestController = require("../controllers/requestController");
const commentController = require("../controllers/commentController");
const languageController = require("../controllers/languageController");
const subjectController = require("../controllers/subjectController");
const { Op } = require("sequelize");

exports.chat = async (req, res) => {
    //const { idSubject, name, category, idLanguage } = req.body;
    //Ver quais assuntos o usuario está apto a pegar, se for admin pega todos
    //rules
    const idSubject = '1,2,3';
    const idLanguage = '1,2,3';
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

        const filter3 = { idSubject: f3subjects, idLanguage: f3languages };

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
    const { cpfClients, name, email, subject, language, idRequests } = req.body;

    const clientbody = {
        cpfClients: cpfClients,
        name: name,
        email: email
    };


    const requestbody = {
        idRequests: idRequests,
        subject: subject,
        language: language
    };

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
    console.log(date);

    //body = { endedAt: }
    const request = [];
    const idRequests = body.idRequests.split(",");
    console.log(body.idRequests);
    idRequests.forEach((idRequest) => {
        data = {
            endedAt: date,
            status: 'Fechado',
            idRequests: idRequest
        }
        request.push(requestController.update(data, res));
    });
    return res.status(201).json(request);
}

exports.requests = async (req, res) => {
    const body = req.body;

    const requests = await requestController.select();

    const subjects = await subjectController.select();

    requests.forEach(request => {
        var varforsubject;
        subjects.forEach(data3 => {
            if (data3.idSubjects == request.idSubject) {
                varforsubject = data3.name;
            }
        })
        request.dataValues.subject = varforsubject
    });


    return res.status(200).json(requests);

}