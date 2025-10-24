import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: "./uploads/",
    
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["text/xml", "application/xml"];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb('Invalid File Type. Only XML files are allowed!', false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter,
});

export default upload;