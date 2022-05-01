"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_controller_1 = require("../controllers/email.controller");
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
let storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/files');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + ' - ' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.post('/', upload.single('file'), email_controller_1.sendMail);
exports.default = router;
//# sourceMappingURL=email.js.map