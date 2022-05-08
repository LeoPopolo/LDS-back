import { Request, Response } from 'express';
import { transporter } from '../config/mailer';

export async function sendMail(req: Request, res: Response) {

    await transporter.sendMail({
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
            <p>Líder: ${req.body.leader}</p>
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
            }
        )
    })
    .catch(function(err: any) {
        res.status(400).json({
                status: 'error',
                message: err
            }
        )
    });
}
