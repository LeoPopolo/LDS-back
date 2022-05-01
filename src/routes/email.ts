import { Router } from 'express';
import { sendMail }  from '../controllers/email.controller';
import path from 'path';
import multer from 'multer';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/files')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + ' - ' + Date.now() + path.extname(file.originalname))
    } 
});

const upload = multer( { storage } );

const router: Router = Router();

router.post('/', upload.single('file'), sendMail);

export default router;