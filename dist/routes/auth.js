"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const router = express_1.Router();
const auth_controller_1 = require("../controllers/auth.controller");
router.post('/signup', auth_controller_1.signup);
router.post('/signin', auth_controller_1.signin);
router.get('/profile', verifyToken_1.tokenValidation, auth_controller_1.profile);
router.get('/inscription', verifyToken_1.tokenValidation, auth_controller_1.inscription);
router.get('/users', verifyToken_1.tokenValidation, auth_controller_1.users);
exports.default = router;
//# sourceMappingURL=auth.js.map