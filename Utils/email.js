const nodemailer = require("nodemailer");
const pug = require("pug");
// const sendEmail = async (options) => {
//   //2) Define the email options

//   //3)Actually send the email
//   // await transporter.sendEmail(mailOptions);
//   await transporter.sendMail(mailOptions);
// };
// module.exports = sendEmail;

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Simon Kabui  <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === production) {
      // sendgrid
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_API_KEY,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // send actual email
  send(template, subject) {
    //  send html options based on react
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(
      `${__dirname}/../public/templates/${template}.pug`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );

    // define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    // create a transport and send email
    this.newTransport();
  }

  async welcomeMessage() {
    await this.send("Welcome", "Welcome to SkyTrappers");
  }
  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
};
