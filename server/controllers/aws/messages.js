const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId
});
const { getMessages } = require("./utils");

let messageSections = [];
const getMessageSermons = (req, res) => {
  new Promise(resolve =>
    s3.listObjects(
      { Bucket: "raymp3s", Prefix: "Messages/", Delimiter: "/" },
      function(err, res) {
        if (err) console.log(err);
        if (res) {
          messageSections = res.CommonPrefixes;
          console.log("====>", messageSections);
          resolve(messageSections);
        }
      }
    )
  ).then(results => {
    let newMessages = Promise.all(
      messageSections.map(async e => {
        return { Title: e.Prefix, messages: await getMessages(e.Prefix) };
      })
    );
    newMessages.then(resultzz => {
      console.log(resultzz);
      res.status(200).json(resultzz);
    });
    console.log("me first");
  });
};
module.exports = {
  getMessageSermons
};
