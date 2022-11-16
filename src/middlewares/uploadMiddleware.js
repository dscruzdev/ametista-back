const multer = require('multer')

exports.photoupload = (req, res, next) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images/')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        },
    });
    const upload = multer({ storage: storage });
    console.log("Passamos por aqui");
    return upload;
}