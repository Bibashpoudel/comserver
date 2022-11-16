import { codeDebug, contactUs, newsLetter } from './nodeMailer.helper';

import * as nodemailer from 'nodemailer';

async function nodeMailer(requirements: any, forWhat: any) {
  try {
    console.log('email', process.env.EMAIL);
    const transporter = await nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gamil.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    //   const transporter: any = await nodemailer.createTransport({
    //     service: process.env.MAIL_SERVICE,
    //     host: process.env.MAIL_HOST,
    //     port: process.env.MAIL_PORT,
    //     auth: {
    //       user: process.env.MAIL_ACCOUNT,
    //       pass: process.env.MAIL_PASSWORD,
    //     },
    //   });

    switch (forWhat) {
      // case 'newAccount':
      //   return await newAccount(requirements, transporter);
      //   case 'forgetPassword':
      //     return await sendForgotPasswordOtp(requirements, transporter, res);
      //   case 'sendPassword':
      //     return await sendPassword(requirements, transporter, res);

      //   case "contactUs_Message":
      //     return await sendContactUsMessage(requirements, transporter, res);

      case 'debug':
        return await codeDebug(requirements, transporter);
      case 'contactUs':
        return await contactUs(requirements, transporter);
      case 'newsLetter':
        return await newsLetter(requirements, transporter);
    }
  } catch (err) {
    console.log(err);
  }
}
export { nodeMailer };
