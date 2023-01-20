const sgMail = require("@sendgrid/mail");
const keys = require("./../config/keys");

sgMail.setApiKey(keys.SENDGRID_API_KEY);

module.exports = class EmailClass {
  constructor(user, res) {
    (this.firstName = user.name.split(" ")[0]), (this.recipient = user.email);
    this.res = res;
  }

  async sendEmail(topic, text) {
    const msg = {
      from: "kabuisimon@gmail.com",
      to: this.recipient,
      subject: topic,
      text: text,
      html: `<strong>${text}</strong>`,
    };

    await sgMail
      .send(msg)
      .then(() => {
        this.res.json({
          status: "success",
          message: "Email sent successfully",
        });
        console.log("Email sent successfully");
      })
      .catch((err) => {
        console.log("Error sending email");
        console.log(err);
        console.error(err);
      });
  }

  async sendWelcome() {
    await this.sendEmail(
      "Registration Successful",
      `Welcome ${this.firstName} to SkyTrappers, Home of dreamers`
    );
  }

  async sendPasswordReset(url) {
    await this.sendEmail(
      "Reset your password",
      `Please reset your password here. The reset token is valid for 10 min!. Click on this link, ${url}`
    );
  }
};
