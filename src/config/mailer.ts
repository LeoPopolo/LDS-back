import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'leopopolo98@gmail.com',
      pass: 'yrandtpmlouyvvtq'
    }
});

transporter.verify().then(()=> {
    console.log("Ready for send emails");
});