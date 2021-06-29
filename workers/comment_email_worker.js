const queue = require("../config/kue");
const commentsMailer = require("../mailers/comment-mailer");
queue.process("emails", function (job, done) {
  console.log("Emails Worker is processing a job", job.data);
  commentsMailer.newComment(job.data);
  done();
});
