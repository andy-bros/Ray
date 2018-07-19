const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId
});

const getCourses = () => {
  s3.listObjects(
    { Bucket: "raymp3s", Prefix: "Courses/", Delimiter: "/" },
    function(err, res) {
      if (err) console.log(err);
      if (res) console.log(res);
    }
  );
};
getCourses();
