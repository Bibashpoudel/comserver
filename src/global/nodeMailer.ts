import {
  codeDebug,
  contactUs,
  cvResponse,
  newsLetter,
  test,
} from './nodeMailer.helper';

import * as nodemailer from 'nodemailer';

async function nodeMailer(requirements: any, forWhat: any, type: any) {
  try {
    console.log(process.env.HOST, process.env.USER, process.env.EMAIL);
    const transporter = await nodemailer.createTransport({
      host: process.env.HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.verify();
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
      case 'test':
        return await test(requirements, transporter);
      case 'cvResponse':
        return await cvResponse(requirements, transporter);
    }
  } catch (err) {
    console.log(err);
  }
}
export { nodeMailer };
