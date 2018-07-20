const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId
});

let courses = [];
const getCourses = (req, res) => {
  // console.log("first first");
  new Promise(function(fulfill, reject) {
    s3.listObjects(
      { Bucket: "raymp3s", Prefix: "Courses/", Delimiter: "/" },
      function(err, good) {
        if (err) reject(err);
        if (good) {
          courses = good.CommonPrefixes;
          // console.log("HERE => ", courses);
          fulfill(courses);
        }
      }
    );
  })
    .then(result => {
      // console.log("HERE => ", courses);
      console.log("second second");

      new Promise(function(done, denied) {
        // console.log("HERE => ", courses);
        courses = courses.forEach((e, i) => {
          // console.log(e);
          e.messages = s3.listObjects(
            { Bucket: "raymp3s", Prefix: e.Prefix },
            function(err, tru) {
              if (err) console.log(err);
              if (tru) {
                console.log("AYYYEE", tru.Contents);
                return tru.Contents;
              }
            }
          );
          // console.log(e.Prefix);
        });
        // console.log(result);
        done(result);
      });
    })
    .then(resultz => {
      console.log(resultz);
      console.log("third third");
      // console.log(courses);
      // res.status(200).json(courses);
    });

  // console.log("first first");

  // }).then(result => {
  //   console.log("right here", result);
  //   new Promise(function(resolved, rejected) {
  //     courses = result.map((e, i) => {
  //       e.messages = s3.listObjects(
  //         { Bucket: "raymp3s", Prefix: e.Prefix },
  //         function(err, tru) {
  //           if (err) console.log(err);
  //           if (tru) {
  //             console.log("DONE");
  //             return tru.Contents;
  //           }
  //         }
  //       );
  //     });
  //     resolved(courses);
  //   }).then(() => console.log("hello world"));
  // });
};
module.exports = {
  getCourses
};
