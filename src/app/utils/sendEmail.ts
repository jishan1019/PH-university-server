import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (toEmail: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: config.node_env === 'production' ? 465 : 587,
    secure: config.node_env === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: 'rahatali65654@gmail.com',
      pass: 'zvbswnbluioqtuoe',
    },
  });

  await transporter.sendMail({
    from: '"Forget Password Email from PH UNIVERSITY" <rahatali65654@gmail.com>', // sender address
    to: toEmail,
    subject: 'Forget your password', // Subject line
    text: 'Reset your password whiting 10min', // plain text body
    html: html, // html body
  });
};
