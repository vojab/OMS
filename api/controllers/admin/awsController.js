module.exports = {

	"index" : function(req, res) {

        var AWS = require('aws-sdk');

        AWS.config.loadFromPath('./config/aws-credentials.json');

        var s3 = new AWS.S3();

        //var bucketParams = { Bucket: 'omsimages' };
        //s3.createBucket(bucketParams);

        var s3Bucket = new AWS.S3( { params: {Bucket: 'omsimages'} } );

        var data = {Key: "image_name", Body: "image_body"};

        s3Bucket.putObject(data, function(err, data){
            if (err) {
                console.log('Error uploading data: ', err);
            } else {
                console.log('succesfully uploaded the image!');
            }
        });

        res.view();

	}

};

