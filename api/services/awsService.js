// /* This is service for AWS APIs */
// 
// var AWS = require('aws-sdk');
// AWS.config.loadFromPath('./config/aws-credentials.json');
// 
// //console.log("AWS SERVICE - AWS: ", AWS);
// 
// module.exports = {
// 
	// uploadImage : function(image, fileName) {
// 
		// var s3Bucket = new AWS.S3({
			// params : {
				// Bucket : 'omsimages'
			// }
		// });
// 
		// if (image) {
			// var data = {
				// Key : fileName,
				// Body : image
			// };
			// s3Bucket.putObject(data, function(err, data) {
				// if (err) {
					// // TODO: Return jSend response
					// console.log('Error uploading data: ', err);
				// } else {
					// // TODO: Return jSend response
					// console.log('Successfully uploaded the image!');
				// }
			// });
		// } else {
			// // TODO: Return jSend response
			// console.log('File not found!');
		// }
// 
	// }
// };
