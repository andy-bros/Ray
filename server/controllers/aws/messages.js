const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId
});

let messageSections = ["dogs"];

// GETS ALL MESSAGE SECTION TITLES
const getMessageSections = () => {
  return new Promise(resolve =>
    s3.listObjects(
      { Bucket: "raymp3s", Prefix: "Messages/", Delimiter: "/" },
      function(err, res) {
        if (err) console.log(err);
        if (res) {
          messageSections = res.CommonPrefixes;
          messageSections.map((e, i) => {
            e.messages = s3.listObjects(
              { Bucket: "raymp3s", Prefix: e.Prefix },
              function(err, res) {
                //   if (err) console.log(err);
                if (res) {
                  console.log(res.Contents);
                  return res.Contents;
                }
              }
            );
          });
        }
      }
    )
  );
};
const getMessagesSections = async (req, res) => {
  await getMessageSections();
  console.log("next");
  console.log(messageSections);
  res.status(200).json(messageSections);
};
module.exports = {
  getMessagesSections
};
