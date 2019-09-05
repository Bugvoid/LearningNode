var fs = require("fs");
var { Base64Decode } = require("base64-stream");
var Imap = require("imap");
var imap = new Imap({
  user: "luan.alves@comuniki.me",
  password: "N8xktiy9",
  host: "outlook.office365.com",
  port: 993,
  tls: true,
  authTimeout: 3000,
  tlsOptions: { rejectUnauthorized: false }
});

function toUpper(thing) {
  return thing && thing.toUpperCase ? thing.toUpperCase() : thing;
}

function findAttachmentParts(struct, attachments) {
  attachments = attachments || [];
  for (var i = 0, len = struct.length, r; i < len; ++i) {
    if (Array.isArray(struct[i])) {
      findAttachmentParts(struct[i], attachments);
    } else {
      if (
        struct[i].disposition &&
        ["ATTACHMENT"].indexOf(toUpper(struct[i].disposition.type)) > -1
      ) {
        attachments.push(struct[i]);
      }
    }
  }

  return attachments;
}

function buildAttMessageFunction(attachment) {
  var filename = attachment.params.name.replace(/[?=]/g, "");
  var encoding = attachment.encoding;

  return function(msg, seqno) {
    msg.on("body", function(stream, info) {
      //Create a write stream so that we can stream the attachment to file;
      console.log(filename);

      var writeStream = fs.createWriteStream(filename);

      console.log(stream);

      //stream.pipe(writeStream); this would write base64 data to the file.
      //so we decode during streaming using
      if (toUpper(encoding) === "BASE64") {
        //the stream is base64 encoded, so here the stream is decode on the fly and piped to the write stream (file)
        stream.pipe(new Base64Decode()).pipe(writeStream);
      } else {
        //here we have none or some other decoding streamed directly to the file which renders it useless probably
        stream.pipe(writeStream);
      }
    });
  };
}

imap.once("ready", function() {
  imap.openBox("Aspect", false, function(err, box) {
    if (err) throw err;
    imap.search(["ALL"], function(err, result) {
      if (err) throw err;
      var f = imap.fetch(result, { bodies: "", struct: true });
      f.on("message", function(msg, seqno) {
        msg.on("body", function(stream, info) {
          var buffer = "";
          stream.on("data", function(chunk) {
            buffer += chunk.toString("utf8");
          });
          stream.once("end", function() {});
        });
        msg.once("attributes", function(attrs) {
          var attachments = findAttachmentParts(attrs.struct);
          for (var i = 0, len = attachments.length; i < len; ++i) {
            var attachment = attachments[i];

            var f = imap.fetch(attrs.uid, {
              //do not use imap.seq.fetch here
              bodies: [attachment.partID],
              struct: true
            });

            //build function to process attachment message
            f.on("message", buildAttMessageFunction(attachment));
          }
        });
      });
      f.once("error", function(err) {});
      f.once("end", function() {
        imap.end();
      });
    });
  });
});

imap.once("error", function(err) {
  console.log(err);
});

imap.once("end", function() {
  console.log("Connection ended");
});

imap.connect();
