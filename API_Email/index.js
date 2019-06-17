const MailListener = require("mail-listener2");
const Imap = require('imap');
const MailParser = require("mailparser").MailParser;
const nodemailer = require('nodemailer');
const Promise = require("bluebird");
const express = require('express') 
const app = express()
const user = "bugvoid404@hotmail.com"
const pass = "78vhjklp"

//host: "imap-mail.outlook.com" 


Promise.longStackTraces();

var imapConfig = new Imap({
  user: user,
  pass: pass,
  host: 'outlook.office365.com',
  porta: 993,
  tls: true,
  secureConnection: false,
  tlsOptions: { secureProtocol: "TLSv1_method" }
  
});

var imap = new Imap(imapConfig);
Promise.promisifyAll(imap);

imap.once("ready", execute);  
imap.once("error", function (err) {
  console.error("Connection error: " + err.stack);
});

imap.connect();

function execute() {
  imap.openBox("INBOX", false, function (err, mailBox) {
    if (err) {
      console.error(err);
      return;
    }
    imap.search(["UNSEEN"], function (err, results) {
      if (!results || !results.length) { console.log("No unread mails"); imap.end(); return; }
      //mark as seen
      imap.setFlags(results, ['\\Seen'], function(err) {
          if (!err) {
              console.log("marked as read");
          } else {
              console.log(JSON.stringify(err, null, 2));
          }
      });

      var f = imap.fetch(results, { bodies: "" });
      f.on("message", processMessage);
      f.once("error", function (err) {
        return Promise.reject(err);
      });
      f.once("end", function () {
        console.log("Done fetching all unseen messages.");
        imap.end();
      });
    });
  });
}


function processMessage(msg, seqno) {
  console.log("Processing msg #" + seqno);
  // console.log(msg);


      //TITULOS DO EMAIL
  var parser = new MailParser();
  parser.on("headers", function (headers) {
    console.log("Header: " + JSON.stringify(headers));
  });

  parser.on('data', data => {
    if (data.type === 'text') {
      console.log(seqno);
      console.log(data.text);  /* data.html*/
    }
        //NAO PEGAR ARQUIVOS 
    // if (data.type === 'attachment') {
    //     console.log(data.filename);
    //     data.content.pipe(process.stdout);
    //     // data.content.on('end', () => data.release());
    // }
  });

    //CORPO
  msg.on("body", function (stream) {
    stream.on("data", function (chunk) {
      parser.write(chunk.toString("utf8"));
    });
  });

  //FINAL?
  msg.once("end", function () {
    // console.log("Finished msg #" + seqno);
    parser.end();
  });
}







// Create the transporter with the required configuration for Outlook
// change the user and pass !
/*
var transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers: 'SSLv3'
  },
  auth: {
    user: user,
    pass: pass
  }
});

// setup e-mail data, even with unicode symbols
var mailOptions = {
  from: user,
  to: 'bugvoid404@gmail.com',
  subject: 'E-mail enviado usando Node!',
  text: 'Testando pela Milessima vez haaaaaaaaaa'
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    return console.log(error);
  }

  console.log('Message sent: ' + info.response);
});*/