module.exports = {

	"index" : function(req, res) {

        var imagePath = "./assets/images/back_to_top.png";
        var fileName = "back_to_top.png";

        aws.uploadImage(imagePath, fileName);

        res.view();

	}

};

