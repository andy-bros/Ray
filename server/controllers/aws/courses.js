const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId
});

var courses = [];
const getCourses = (req, res) => {
  // console.log("first first");
  new Promise(function(fulfill, reject) {
    s3.listObjects(
      { Bucket: "raymp3s", Prefix: "Courses/", Delimiter: "/" },
      function(err, good) {
        if (err) reject(err);
        if (good) {
          courses = good.CommonPrefixes;
          console.log("HERE => ", courses);
          fulfill(courses);
        }
      }
    );
  })
    .then(
      //THIS IS RUNNING BEFORE THE FIRST ^^ FINISHES. THIS IS WHY COURSES === []
      new Promise(function(finished, denied) {
        console.log("HAHAHAHAHAH", courses);
        courses.forEach((e, i, a) => {
          // console.log("eeeeee =>", e);
          return s3.listObjects(
            { Bucket: "raymp3s", Prefix: e.Prefix },
            function(err, tru) {
              if (err) console.log(err);
              if (tru) {
                // console.log("AYYYEE");
                a[i].messages = tru.Contents;

                // console.log(e);
              }
            }
          );
        });
        console.log("COURSESSSS", courses);
        finished(courses);
      })
    )
    .then(resultz => {
      // console.log("here=>>>>>>>>", resultz);
      console.log("third third");
      // console.log(courses);
    });

  // console.log("first first");
};
module.exports = {
  getCourses
};
