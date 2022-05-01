"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const router = express_1.Router();
const user_controller_1 = require("../controllers/user.controller");
router.get('/identify-by-id/:id', verifyToken_1.tokenValidation, user_controller_1.identifyById);
router.get('/user-inscriptions/:id', verifyToken_1.tokenValidation, user_controller_1.userInscriptions);
router.get('/subjects', verifyToken_1.tokenValidation, user_controller_1.getSubjects);
router.post('/add-inscription', verifyToken_1.tokenValidation, user_controller_1.addInscription);
router.patch('/set-name/:id/:name', verifyToken_1.tokenValidation, user_controller_1.setName);
router.patch('/set-surname/:id/:surname', verifyToken_1.tokenValidation, user_controller_1.setSurname);
router.patch('/set-username/:id/:username', verifyToken_1.tokenValidation, user_controller_1.setUsername);
router.patch('/set-phone/:id/:phone', verifyToken_1.tokenValidation, user_controller_1.setPhoneNumber);
router.patch('/set-email/:id/:email', verifyToken_1.tokenValidation, user_controller_1.setEmail);
router.patch('/set-birthdate/:id/:birthdate', verifyToken_1.tokenValidation, user_controller_1.setBirthdate);
router.post('/set-password/:id', verifyToken_1.tokenValidation, user_controller_1.setPassword);
exports.default = router;
//# sourceMappingURL=user.js.map