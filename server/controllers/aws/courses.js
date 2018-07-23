const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId
});

var courses = [];
function getMessages(e) {
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
}
const getCourses = (req, res) => {
  new Promise(function(fulfill, reject) {
    //
    //
    //This s3 call is getting all of the titles for each
    //course and storing the return values in the courses
    // variable
    //
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
    //once this forEach is completed, res.status(200).json(courses)
    //needs to be invoked
    let newCourses = Promise.all(
      courses.map(async e => {
        return { Title: e.Prefix, messages: await getMessages(e.Prefix) };
      })
    );
    newCourses.then(resultzz => {
      console.log(resultzz);
      res.status(200).json(resultzz);
    });
    console.log("me first");
  });
};
module.exports = {
  getCourses
};
