module.exports = {

    "index" : function(req, res) {

        res.view();

    },

	"upload" : function(req, res) {

//        var imagePath = "./assets/images/back_to_top.png";req.files.displayImage.path
//        var fileName = "back_to_top.png";

        console.log(req.files);

        var imagePath = req.files.file.path;
        var fileName = req.files.file.name;

        var response = aws.uploadImage(imagePath, fileName);

        //var response = {status: "success", message: "Success!"};

        var status = response.status;
        var message = response.message;

        res.json({
            status : status,
            message : message
        });

	}

};

