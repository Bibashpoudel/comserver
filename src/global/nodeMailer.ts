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
    console.log(
      'client id',
      process.env.CLIENT_ID,
      'private key',
      process.env.PRIVATE_KEY,
    );
    let transporter;
    if (type == 'hr') {
      transporter = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: process.env.HR_EMAIL,
          serviceClient: process.env.CLIENT_ID,
          privateKey: process.env.PRIVATE_KEY,
        },
      });
    } else {
      transporter = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL,
          serviceClient: process.env.CLIENT_ID,
          privateKey: process.env.PRIVATE_KEY,
        },
      });
    }

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
