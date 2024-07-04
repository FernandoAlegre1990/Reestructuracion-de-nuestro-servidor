import multer from 'multer'
import path from 'path'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = 'uploads/others'; // Default path

        if (file.fieldname === 'profile') {
            uploadPath = 'uploads/profiles';
        } else if (file.fieldname === 'product') {
            uploadPath = 'uploads/products';
        } else if (file.fieldname === 'documents') {
            uploadPath = 'uploads/documents';
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB limit (adjust as needed)
    },
    fileFilter: (req, file, cb) => {
        // Validate file types if needed
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.mimetype)) {
            cb(new Error('Only JPEG and PNG images are allowed'));
        } else {
            cb(null, true);
        }
    }
});

export default upload