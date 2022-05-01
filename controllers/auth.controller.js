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
exports.users = exports.inscription = exports.profile = exports.signin = exports.signup = void 0;
const user_1 = require("../models/user");
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = new user_1.User(req.body.username, req.body.password, req.body.email, req.body.birthdate, req.body.name, req.body.surname, req.body.phone_number, req.body.role);
        user.password = yield user.encryptPassword(req.body.password);
        const rows = yield database_1.default.query('INSERT INTO user SET ?', [user])
            .catch(err => {
            return res.status(400).send(err);
        });
        if (rows !== undefined && rows !== null) {
            // generating token
            const token = jsonwebtoken_1.default.sign({
                _id: user.username
            }, process.env.TOKEN_SECRET);
            const response = yield database_1.default.query('SELECT id FROM user WHERE username = ?', [user.username])
                .catch(err => {
                return res.status(400).send(err);
            });
            if (response !== null && response !== undefined) {
                user.id = response[0].id;
                res.status(200).json({
                    status: 'OK',
                    token: token,
                    data: user
                });
            }
        }
    });
}
exports.signup = signup;
;
function signin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = new user_1.User("", "", "", "", "", "", "", "");
        const rows = yield database_1.default.query('SELECT * FROM user WHERE username = ?', [req.body.username])
            .catch(err => {
            return res.status(400).send(err);
        });
        if (rows.length === 0 || rows === null || rows === undefined) {
            return res.status(400).json({
                error: 'username or password incorrect'
            });
        }
        else {
            user.email = rows[0].email;
            user.password = rows[0].password;
            user.username = rows[0].username;
            user.id = rows[0].id;
            user.birthdate = rows[0].birthdate;
            user.name = rows[0].name;
            user.surname = rows[0].surname;
            user.phone_number = rows[0].phone_number;
            user.role = rows[0].role;
            const correctPassword = yield user.validatePassword(req.body.password);
            if (!correctPassword) {
                return res.status(400).json({
                    error: 'invalid password'
                });
            }
            const token = jsonwebtoken_1.default.sign({
                _id: user.id
            }, process.env.TOKEN_SECRET);
            res.header('Authorization', token).json({
                data: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    birthdate: user.birthdate,
                    name: user.name,
                    surname: user.surname,
                    phone_number: user.phone_number,
                    role: user.role
                }
            });
        }
    });
}
exports.signin = signin;
function profile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = new user_1.User("", "", "", "", "", "", "", "");
        const rows = yield database_1.default.query('SELECT * FROM user WHERE id = ?', [req.userId])
            .catch(err => {
            return res.status(400).send(err);
        });
        if (rows.length === 0 || rows === null || rows === undefined) {
            return res.status(404).json({
                error: 'user not found'
            });
        }
        else {
            user.email = rows[0].email;
            user.password = rows[0].password;
            user.username = rows[0].username;
            user.id = rows[0].id;
            user.birthdate = rows[0].birthdate;
            user.name = rows[0].name;
            user.surname = rows[0].surname;
            user.phone_number = rows[0].phone_number;
            user.role = rows[0].role;
            res.status(200).json({
                data: user
            });
        }
    });
}
exports.profile = profile;
function inscription(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var inscriptionArray = [];
        const rows = yield database_1.default.query(`SELECT i.inscription_id, i.subject_id, i.inscription_date, i.approved_date, i.approved, i.final_note, i.class_hour, i.finished, s.name, s.quarter, s.professor
                FROM inscription i, subject s
                WHERE i.pupil_id = ? AND i.subject_id = s.subject_id;`, [req.userId])
            .catch(err => {
            return res.status(400).send(err);
        });
        if (rows.length === 0 || rows === undefined || rows === null) {
            return res.status(404).json({
                error: 'user not found'
            });
        }
        else {
            for (let i = 0; i < rows.length; i++) {
                let auxApproved;
                let auxFinished;
                if (rows[i].approved === 1) {
                    auxApproved = true;
                }
                else {
                    auxApproved = false;
                }
                if (rows[i].finished === 1) {
                    auxFinished = true;
                }
                else {
                    auxFinished = false;
                }
                inscriptionArray[i] = {
                    "inscription_approved": auxApproved,
                    "inscription_approved_date": rows[i].approved_date,
                    "inscription_date": rows[i].inscription_date,
                    "inscription_id": rows[i].inscription_id,
                    "inscription_note": rows[i].final_note,
                    "inscription_finished": auxFinished,
                    "inscription_class_hour": rows[i].class_hour,
                    "subject_id": rows[i].subject_id,
                    "subject_name": rows[i].name,
                    "subject_quarter": rows[i].quarter,
                    "subject_professor": rows[i].professor
                };
            }
            res.status(200).json({
                data: inscriptionArray
            });
        }
    });
}
exports.inscription = inscription;
function users(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var usersArray = [];
        const rows = yield database_1.default.query(`SELECT u.id, u.username, u.email, u.birthdate, u.name, u.surname, u.phone_number
                FROM user u
                WHERE u.role = 'pupil';`)
            .catch(err => {
            return res.status(400).send(err);
        });
        if (rows.length === 0) {
            return res.status(404).json({
                error: 'Empty list'
            });
        }
        else {
            for (let i = 0; i < rows.length; i++) {
                usersArray[i] = {
                    "id": rows[i].id,
                    "username": rows[i].username,
                    "name": rows[i].name,
                    "surname": rows[i].surname,
                    "email": rows[i].email,
                    "phone_number": rows[i].phone_number,
                    "birthdate": rows[i].birthdate,
                };
            }
            res.status(200).json({
                data: usersArray
            });
        }
    });
}
exports.users = users;
//# sourceMappingURL=auth.controller.js.map