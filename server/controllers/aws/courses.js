const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId
});

var courses = [];
const getCourses = (req, res) => {
  new Promise(function(fulfill, reject) {
    //
    //this s3 call is initially getting all of the sections that are inside
    //of the clients s3 courses section of the aws bucket.
    //
    s3.listObjects(
      { Bucket: "raymp3s", Prefix: "Courses/", Delimiter: "/" },
      function(err, good) {
        if (err) reject(err);
        if (good) {
          courses = good.CommonPrefixes;
          fulfill(courses);
        }
      }
    );
  }).then(results => {
    new Promise(function(thisWillFinish, thisIs404) {
      courses.forEach((e, i, a) => {
        console.log("eeeeee");
        //
        //this is mapping through the sections, and plugging in the stored
        //values that we received from above, and getting the messages for
        //each one of those sections, and making a message key to make it equal
        //the returned messages
        //
        s3.listObjects({ Bucket: "raymp3s", Prefix: e.Prefix }, function(
          err,
          tru
        ) {
          if (err) console.log(err);
          if (tru) {
            console.log("AYYYEE");
            return (e.messages = tru.Contents);
          }
        });
        resolveThis(courses);
      });
      thisWillFinish(courses);
    }).then(() =>
      //this is proof that courses is getting mapped, and that each course is receiving the messages it needs
      // setTimeout(() => console.log(courses), 5000)
      console.log(courses)
    );
  });

  // .then(() => setTimeout(() => console.log(courses[0].messages[0]), 5000));
};
module.exports = {
  getCourses
};
