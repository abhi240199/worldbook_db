const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const { relative } = require("path");

let transporter = nodemailer.createTransport({
  service: "gmail",
  post: 587,
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: "ap8209655@gmail.com",
    pass: "8090939516",
  },
});
let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log("error in rendering template", err);
        return;
      }

      mailHTML = template;
    }
  );

  return mailHTML;
};

module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
