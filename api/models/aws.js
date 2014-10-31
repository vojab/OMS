module.exports = {
	
	uploadImage: function(imagePath, fileName) {

        var AWS = require('aws-sdk');

        AWS.config.loadFromPath('./config/aws-credentials.json');

        var s3Bucket = new AWS.S3( { params: {Bucket: 'omsimages'} } );

        var fs = require('fs');

        fs.readFile(imagePath, function (err, imageData) {
            if (err) throw err;

            if (imageData) {
                var data = {Key: fileName, Body: imageData};
                s3Bucket.putObject(data, function(err, data){
                    if (err) {
                        console.log('Error uploading data: ', err);
                    } else {
                        console.log('Successfully uploaded the image!');
                    }
                });
            } else {
                console.log('File not found!');
            }

        });

    }

};

