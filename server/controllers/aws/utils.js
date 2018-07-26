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

let messageSections = [];
let coursesSections = [];
const getMessageSermons = (req, res) => {
  // messageSections.length !== 0
  //   ? res.status(200).json(messageSections)
  // : // console.log("lmaooo")
  if (req.query.section === "Courses" && coursesSections.length !== 0) {
    res.status(200).json(coursesSections);
  } else if (req.query.section === "Messages" && messageSections.length !== 0) {
    res.status(200).json(messageSections);
  }

  new Promise(resolve =>
    s3.listObjects(
      {
        Bucket: "raymp3s",
        Prefix: `${req.query.section}/`,
        Delimiter: "/"
      },
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
      if (req.query.section === "Courses") {
        coursesSections = resultzz;
      } else if (req.query.section === "Messages") {
        messageSections = resultzz;
      }
      // console.log(messageSections);
      res.status(200).json(resultzz);
    });
    console.log("me first");
  });
};

module.exports = {
  getMessageSermons
};
