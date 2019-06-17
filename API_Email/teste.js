var MailListener = require("mail-listener2");
const nodemailer = require('nodemailer')
const user = "bugvoid404@hotmail.com"
const pass = "78vhjklp"
const host = "outlook.office365.com"

var mailListener = new MailListener({

  username: user,
  password: pass,
  host: host,
  port: 993, // imap port
  tls: true,
  fetchUnreadOnStart: true,
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX",
  searchFilter: "UNSEEN",
  markSeen: true
});

mailListener.on("server:connected", function () {
  console.log("imapConnected");
});

mailListener.on("server:disconnected", function () {
  console.log("imapDisconnected");
});

        
mailListener.start(
    


); // start listening


// Create the transporter with the required configuration for Outlook
// change the user and pass !
var transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // hostname
  port: 587,
  secure:false,
  auth: {
    user: user,
    pass: pass
  },
  tls: {
    rejectUnauthorized: false
  }
  
});
/*
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bugvoid404@gmail.com',
    pass: pass
  },
  tls: { rejectUnauthorized: false }
});*/

// setup e-mail data, even with unicode symbols
var mailOptions = {
  from: user, // sender address (who sends)
  to: 'bugvoid404@gmail.com ,' + user, // list of receivers (who receives)
  subject: 'Hello ', // Subject line
  text: 'Hello world ', // plaintext body
  
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    return console.log(error);
  }

  console.log('Message sent: ' + info.response);
});


/*
exports.sendMail = function(req,res){
}*/






