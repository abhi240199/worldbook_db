const nodemailer = require("../config/nodemailer");
const Comment = require("../models/comment");
exports.newComment = (comment) => {
  console.log("inside newComment mailer", comment);
  let htmlString = nodemailer.renderTemplate(
    { comment: comment },
    "/comments/new_comment.ejs"
  );
  nodemailer.transporter.sendMail(
    {
      from: "ap8209655@gmail.com",
      to: comment.user.email,
      subject: "New Comment Published",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending Mail", err);
        return;
      }
      console.log("Message Sent", info);
      return;
    }
  );
};
