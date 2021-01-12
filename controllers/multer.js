var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, req.session.user._id+'.jpg');
    }
});

var upload = multer({ storage: storage });

module.exports = upload;