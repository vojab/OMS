module.exports = {

	"index" : function(req, res) {

        var AWS = require('aws-sdk');

        AWS.config.loadFromPath('./config/aws-credentials.json');

        var s3 = new AWS.S3();

        //var bucketParams = { Bucket: 'omsimages' };
        //s3.createBucket(bucketParams);

        var s3Bucket = new AWS.S3( { params: {Bucket: 'omsimages'} } );

        var imagePath = "./assets/images/back_to_top.png";
        var fs = require('fs');
        var file = "";

//        fs.readFile(imagePath, function (err, data) {
//            if (err) throw err;
//            //file = data.toString('base64');
//            file = res.write(data);
//            console.log(data);
//            console.log(file);
//        });
//
//        if (file) {
//            var data = {Key: "test_upload_image.jpg", Body: file};
//
//            s3Bucket.putObject(data, function(err, data){
//                if (err) {
//                    console.log('Error uploading data: ', err);
//                } else {
//                    console.log('Successfully uploaded the image!');
//                }
//            });
//        } else {
//            console.log('File not found!');
//        }

        var knox = require('knox');

        var client = knox.createClient({
            key: 'AKIAJVL4I22AVLY25GPA',
            secret: '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',
            bucket: 'omsimages'
        });

        fs.readFile(imagePath, function(err, buf){
            var req = client.put('test_upload_image.png', {
                'Content-Length': buf.length,
                'Content-Type': 'image/png'
            });
            req.on('response', function(res){
                if (200 == res.statusCode) {
                    console.log('saved to %s', req.url);
                }
            });
            req.end(buf);
        });

        res.view();

	}

};

