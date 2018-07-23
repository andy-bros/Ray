const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId
});
const getMessages = function(e) {
  return new Promise(function(r) {
    //
    //
    //This s3 call is getting all of the MESSAGES for each
    //course and returning them, once returned th messages
    // are stored on a messages key of that courses object
    //of line 49
    //
    //
    s3.listObjects({ Bucket: "raymp3s", Prefix: e }, function(err, tru) {
      console.log("THIS IS THE S3 OJECTS");
      if (err) console.log(err);
      if (tru) {
        console.log("AYYYEE");
        r(tru.Contents);
      }
    });
  });
};
module.exports = {
  getMessages
};
