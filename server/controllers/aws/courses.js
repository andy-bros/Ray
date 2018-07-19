const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId
});

let courses = [];
const getCourses = (req, res) => {
  console.log("first first");
  new Promise(function(fulfill, reject) {
    s3.listObjects(
      { Bucket: "raymp3s", Prefix: "Courses/", Delimiter: "/" },
      function(err, res) {
        if (err) reject(err);
        if (res) {
          courses = res.CommonPrefixes;
          fulfill(courses);
        }
      }
    );
  }).then(result => {
    console.log("right here", result);
    new Promise(function(resolved, rejected) {
      courses = result.map((e, i) => {
        e.messages = s3.listObjects(
          { Bucket: "raymp3s", Prefix: e.Prefix },
          function(err, tru) {
            if (err) console.log(err);
            if (tru) {
              console.log("DONE");
              return tru.Contents;
            }
          }
        );
      });
      resolved(courses);
    }).then(() => console.log("hello world"));
  });
};
module.exports = {
  getCourses
};
