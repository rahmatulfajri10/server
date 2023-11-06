const nodemailer = require("nodemailer");
const { gmail, password, url_server } = require("../../config");
const Mustache = require("mustache");
const fs = require("fs");
const axios = require("axios");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: gmail,
    pass: password,
  },
});

const otpMail = async (email, data) => {
  try {
    const atachmentsUrl = `${url_server}/api/v1/cms/qrcode/${data.id_qrcode}`;
    console.log(atachmentsUrl);
    axios.get(atachmentsUrl).then((res) => {
      if (res.status === 200) {
        let template = fs.readFileSync("app/views/email/index.html", "utf8");
        let message = {
          from: gmail,
          to: email,
          subject: "QRcode for registration is: ",
          html: Mustache.render(template, data),
          atachments: [
            {
              filename: `${data.id_qrcode}.jpg`,
              path: atachmentsUrl,
              cid: "qrcode",
            },
          ],
        };
        transporter.sendMail(message);
      }
    });
  } catch (ex) {
    console.log(ex);
  }
};

module.exports = { otpMail };
