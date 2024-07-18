const node = require("jade/lib/nodes/node");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a17e15b75c3938",
    pass: "b0320bfba5e641",
  },
});

module.exports = transporter;
