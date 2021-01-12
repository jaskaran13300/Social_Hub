var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, req.session.user._id+'.jpg');
    }
});

var storageComm = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, req.session.commId + '.jpg');
    }
});

var upload = multer({ storage: storage });
var uploadComm = multer({ storage: storageComm });


module.exports = {
    upload:upload,
    uploadComm:uploadComm
};