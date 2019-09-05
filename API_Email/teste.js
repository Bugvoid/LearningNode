var imaps = require("imap-simple");
var { Base64Decode } = require("base64-stream");
var fs = require("fs");
var config = {
  imap: {
    user: "luan.alves@comuniki.me",
    password: "N8xktiy9",
    host: "outlook.office365.com",
    port: 993,
    tls: true,
    authTimeout: 3000,
    tlsOptions: { rejectUnauthorized: false }
  }
};

imaps.connect(config).then(function(connection) {
  connection
    .openBox("Aspect")
    .then(function() {
      var searchCriteria = ["ALL"];
      var fetchOptions = {
        bodies: ["HEADER.FIELDS (FROM TO SUBJECT DATE)"],
        struct: true
      };

      // retrieve only the headers of the messages
      return connection.search(searchCriteria, fetchOptions);
    })
    .then(function(messages) {
      var attachments = [];

      messages.forEach(function(message) {
        var parts = imaps.getParts(message.attributes.struct);
        attachments = attachments.concat(
          parts
            .filter(function(part) {
              return (
                part.disposition &&
                part.disposition.type.toUpperCase() === "ATTACHMENT"
              );
            })
            .map(function(part) {
              // retrieve the attachments only of the messages with attachments
              return connection
                .getPartData(message, part)
                .then(function(partData) {
                  return {
                    filename: part.disposition.params.filename,
                    data: partData
                  };
                });
            })
        );
      });

      return Promise.all(attachments);
    })
    .then(function(attachments) {
      console.log(attachments);

      // =>
      //    [ { filename: 'cats.jpg', data: Buffer() },
      //      { filename: 'pay-stub.pdf', data: Buffer() } ]
    });
});
