"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("../libs/verifyToken");
const router = express_1.Router();
const inscription_controller_1 = require("../controllers/inscription.controller");
router.patch('/set-inscription-date/:id/:date', verifyToken_1.tokenValidation, inscription_controller_1.setInscriptionDate);
router.patch('/set-approved-date/:id/:date', verifyToken_1.tokenValidation, inscription_controller_1.setApprovedDate);
router.patch('/set-finished/:id/:finished', verifyToken_1.tokenValidation, inscription_controller_1.setFinished);
router.patch('/set-final-note/:id/:note', verifyToken_1.tokenValidation, inscription_controller_1.setFinalNote);
router.patch('/set-class-hour/:id/:class', verifyToken_1.tokenValidation, inscription_controller_1.setClassHour);
exports.default = router;
//# sourceMappingURL=inscription.js.map