const multer = require('multer');
const path = require('path');

const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/image"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg")
    }
});

const multerFilter = (req, file, cb) => {
    if ((file.mimetype.startSWith('image'))) {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

exports.Upload = multer({
    storage: Storage,
    multerFilter: multerFilter,
    limits: { fieldSize: 1000000 }
})