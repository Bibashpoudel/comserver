import * as ejs from 'ejs';

async function codeDebug(requirements: any, transporter: any) {
  try {
    const FROM_NAME = process.env.Name;
    const SENDER = process.env.EMAIL;

    const data = await ejs.renderFile('./public/ejs/sendPassword.ejs', {
      functionName: requirements.functionName,
      errorMessage: requirements.error,
      time: new Date(),
    });

    const mainOptions = {
      from: `"${FROM_NAME}" <${SENDER}> `,
      to: 'pdlbibash77@gmail.com',
      subject: 'Error  Message',
      html: data,
    };
    await transporter.sendMail(mainOptions);
    console.log('Error message is send to developer');
    return 0;
  } catch (error) {
    console.log('error', error);
  }
}
async function contactUs(requirements: any, transporter: any) {
  try {
    const FROM_NAME = process.env.Name;
    const SENDER = process.env.EMAIL;

    const data = await ejs.renderFile('./public/ejs/responseContactus.ejs', {
      fullName: requirements.fullName,
    });

    const mainOptions = {
      from: `"${FROM_NAME}" <${SENDER}> `,
      to: requirements.email,
      subject: 'Contact Us support',
      html: data,
    };
    await transporter.sendMail(mainOptions);
    console.log('Error message is send to developer');
    return 0;
  } catch (error) {
    console.log('error', error);
  }
}
async function newsLetter(requirements: any, transporter: any) {
  try {
    const FROM_NAME = process.env.Name;
    const SENDER = process.env.EMAIL;

    const data = await ejs.renderFile('./public/ejs/newsLetter.ejs', {});

    const mainOptions = {
      from: `"${FROM_NAME}" <${SENDER}> `,
      to: requirements.email,
      subject: 'NewsLetter',
      html: data,
    };
    await transporter.sendMail(mainOptions);
    console.log('Error message is send to developer');
    return 0;
  } catch (error) {
    console.log('error', error);
  }
}
async function cvResponse(requirements: any, transporter: any) {
  try {
    const FROM_NAME = process.env.Name;
    const SENDER = process.env.HR_EMAIL;

    const data = await ejs.renderFile('./public/ejs/cvResponse.ejs', {
      fullName: requirements.fullName,
      position: requirements.position,
    });

    const mainOptions = {
      from: `"${FROM_NAME}" <${SENDER}> `,
      to: requirements.email,
      subject: 'Confirmation of Your Application',
      html: data,
    };
    await transporter.sendMail(mainOptions);
    console.log('Error message is send to developer');
    return 0;
  } catch (error) {
    console.log('error', error);
  }
}
async function test(requirements: any, transporter: any) {
  try {
    const FROM_NAME = process.env.Name;
    const SENDER = process.env.EMAIL;

    console.log(FROM_NAME);

    const data = await ejs.renderFile('./public/ejs/abc.ejs', {});

    const mainOptions = {
      from: `"${FROM_NAME}" <${SENDER}> `,
      to: requirements.email,
      subject: 'TestMessage',
      html: data,
    };
    await transporter.sendMail(mainOptions);
    console.log('Error message is send to test');
    return 0;
  } catch (error) {
    console.log('error', error);
  }
}
export { codeDebug, contactUs, newsLetter, test, cvResponse };
