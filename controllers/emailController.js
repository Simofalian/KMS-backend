// const catchAsync = require("../Utils/catchAsync");
// const sgMail = require("@sendgrid/mail");
// const keys = require("./../config/keys");

// sgMail.setApiKey(keys.SENDGRID_API_KEY);

// exports.sendEmail = catchAsync(async (req, res) => {
//   const { recipient, topic, text } = req.query;

//   const msg = {
//     from: "kabuisimon@gmail.com",
//     to: recipient,
//     subject: topic,
//     text: text,
//     html: `<strong>${text}</strong>`,
//   };
//   await sgMail
//     .send(msg)
//     .then(() => {
//       res.status(200).json({
//         status: "success",
//         message: "Email sent successfully",
//       });
//       console.log("Email sent successfully");
//     })
//     .catch((err) => {
//       console.log("Error sending email");
//       console.log(err);
//       console.error(err.response.body);
//     });
// });

const catchAsync = require("../Utils/catchAsync");
const sgMail = require("@sendgrid/mail");
const keys = require("./../config/keys");
const Email = require("./../Utils/email");

sgMail.setApiKey(keys.SENDGRID_API_KEY);

exports.sendEmail = catchAsync(async (req, res) => {
  const { recipient, topic, text } = req.query;

  const msg = {
    from: "kabuisimon@gmail.com",
    to: recipient,
    subject: topic,
    text: text,
    html: `<strong>${text}</strong>`,
  };
  await sgMail
    .send(msg)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Email sent successfully",
      });
      console.log("Email sent successfully");
    })
    .catch((err) => {
      console.log("Error sending email");
      console.log(err);
      console.error(err.response.body);
    });
});
