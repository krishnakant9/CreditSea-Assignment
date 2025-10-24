import express from 'express';
import { uploadReport,getReports,getReportById} from '../controllers/reportController.js';

import upload from '../utils/multer.js';

const router = express.Router();

router.post('/upload', upload.single('xmlfile'), uploadReport);

router.get("/", getReports);

router.get("/:id", getReportById);

export default router;