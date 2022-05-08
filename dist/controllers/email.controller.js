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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const mailer_1 = require("../config/mailer");
function sendMail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield mailer_1.transporter.sendMail({
            from: '"Inscripcion LDS" <leopopolo98@gmail.com>',
            to: "liricadelossantos@gmail.com",
            subject: "Nueva inscripción a LDS",
            html: `
            <p>Inscripcion a Lirica del los santos</p>
            </br>
            <p>Nombre y apellido: ${req.body.name}</p>
            </br>
            <p>Nombre artístico: ${req.body.artisticName}</p>
            </br>
            <p>Iglesia: ${req.body.church}</p>
            </br>
            <p>Lider: ${req.body.leader}</p>
            </br>
            <p>Edad: ${req.body.age}</p>
            </br>
            <p>Teléfono: ${req.body.phone}</p>
            </br>
            <p>Redes sociales: ${req.body.social}</p>
        `,
            attachments: [
                {
                    path: './src/files/' + req.file.filename,
                    filename: 'Imagen.' + (req.file.mimetype).replace('image/', '')
                }
            ]
        })
            .then(function () {
            res.status(200).json({
                status: 'ok',
                message: 'email sended'
            });
        })
            .catch(function (err) {
            res.status(400).json({
                status: 'error',
                message: err
            });
        });
    });
}
exports.sendMail = sendMail;
//# sourceMappingURL=email.controller.js.map