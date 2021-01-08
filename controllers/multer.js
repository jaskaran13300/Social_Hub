var multer = require('multer');

const upload = multer({
    limit: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
            return cb(new Error('File Should be an image'));
        }
        cb(undefined, true);
    }
})

module.exports = upload;