"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setClassHour = exports.setFinalNote = exports.setFinished = exports.setApprovedDate = exports.setInscriptionDate = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function setInscriptionDate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.query(`UPDATE inscription
                SET inscription_date = ?
                WHERE inscription_id = ?`, [req.params.date, req.params.id])
            .catch(err => {
            console.log(err);
            return res.status(400).send(err);
        });
        if (rows !== null && rows !== undefined) {
            res.status(200).json({
                data: {
                    message: 'Operation completed.'
                },
                status: 'OK'
            });
        }
        ;
    });
}
exports.setInscriptionDate = setInscriptionDate;
function setApprovedDate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.query(`UPDATE inscription
                SET approved_date = ?
                WHERE inscription_id = ?`, [req.params.date, req.params.id])
            .catch(err => {
            console.log(err);
            return res.status(400).send(err);
        });
        if (rows !== null && rows !== undefined) {
            res.status(200).json({
                data: {
                    message: 'Operation completed.'
                },
                status: 'OK'
            });
        }
        ;
    });
}
exports.setApprovedDate = setApprovedDate;
function setFinished(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.query(`UPDATE inscription
                SET finished = ?
                WHERE inscription_id = ?`, [req.params.finished, req.params.id])
            .catch(err => {
            console.log(err);
            return res.status(400).send(err);
        });
        if (rows !== null && rows !== undefined) {
            res.status(200).json({
                data: {
                    message: 'Operation completed.'
                },
                status: 'OK'
            });
        }
        ;
    });
}
exports.setFinished = setFinished;
function setFinalNote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let approved = parseInt(req.params.note) > 6 ? true : false;
        const rows = yield database_1.default.query(`UPDATE inscription
                SET final_note = ?, approved = ?
                WHERE inscription_id = ?`, [req.params.note, approved, req.params.id])
            .catch(err => {
            console.log(err);
            return res.status(400).send(err);
        });
        if (rows !== null && rows !== undefined) {
            res.status(200).json({
                data: {
                    message: 'Operation completed.'
                },
                status: 'OK'
            });
        }
        ;
    });
}
exports.setFinalNote = setFinalNote;
function setClassHour(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield database_1.default.query(`UPDATE inscription
                SET class_hour = ?
                WHERE inscription_id = ?`, [req.params.class, req.params.id])
            .catch(err => {
            console.log(err);
            return res.status(400).send(err);
        });
        if (rows !== null && rows !== undefined) {
            res.status(200).json({
                data: {
                    message: 'Operation completed.'
                },
                status: 'OK'
            });
        }
        ;
    });
}
exports.setClassHour = setClassHour;
//# sourceMappingURL=inscription.controller.js.map