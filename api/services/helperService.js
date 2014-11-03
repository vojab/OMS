/* This is service for helper methods */

module.exports = {

	// I created this simple GUID generator, just for demo purposes. Currently, it consists of only 8
	// characters. Guess, that should be enough :-).
	// We should make it a little bit robust and "complex", later, or smt.

	createGUID : function() {

		var S4 = function() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};

		//var guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
		var guid = (S4() + S4()).toLowerCase();
		return guid;

	},
	
	uploadImage: function(image, fileName) {

        var AWS = require('aws-sdk');

        AWS.config.loadFromPath('./config/aws-credentials.json');

        var s3Bucket = new AWS.S3( { params: { Bucket: 'omsimages' } } );

		if (image) {
			var data = {Key: fileName, Body: image};
			s3Bucket.putObject(data, function(err, data){
				if (err) {
					// TODO: Return jSend response
					console.log('Error uploading data: ', err);
				} else {
					// TODO: Return jSend response
					console.log('Successfully uploaded the image!');
				}
			});
		} else {
			// TODO: Return jSend response
			console.log('File not found!');
		}

    }
	
};
