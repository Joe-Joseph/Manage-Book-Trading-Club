import multer from 'multer';
import path from 'path'
import uploads from '../utils/cloudinary';

// specify the storage engine

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'))
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()  }_${  file.originalname}`)
    }
})

// File validation

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        cb({ message: 'Unsupported File Format' }, false)
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 2048 * 2048 },
    fileFilter
})

export default upload
