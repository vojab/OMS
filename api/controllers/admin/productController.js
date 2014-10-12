module.exports = {

	"index" : function(req, res) {

		product.find().where({}).exec(function(error, result) {
			if (error) {
				req.flash("errors", error);
				return 0;
			} else {
				res.view({
					products : result
				});
			}
		});
	},

	"show" : function(req, res) {
		
		product.find({
			id : req.param("id")
		}, function(error, user) {
			if (error || user.length == 0) {
				res.view("errors/genericError", {
					err : error,
					message : "Cannot find product."
				});
			} else {
				res.view({
					member : product[0]
				});
			}
		});
	},

	"new" : function(req, res) {
		res.view();
	},

	"create" : function(req, res) {

		product.create({

			// Basic Product Info
			id : helperService.createGUID(),
			name : req.body.name,
			shortDescription : req.body.shortDescription,
			longDescription : req.body.longDescripton,
			price : req.body.price,
			nutritionDetails : req.body.nutritionDetails,
			manufacturer : req.body.manufacturer,
            expirationDate : req.body.expirationDate,
            entryDate : Date.now(),
            updateDate : Date.now(),
            // TODO: Use currently logged in user ID
            userID : 1

		}).exec(function(error, user) {
			if (error) {
				req.flash("errors", error);
				res.redirect("/admin/product/new");
			} else {
				req.flash("success", "Product successfully created.");
				res.redirect("/admin/product/index");
			}
		});
	},

	"edit" : function(req, res) {

		sails.controllers["admin/product"].show(req, res);

	},

	"update" : function(req, res) {

		product.update({
			id : req.body.productId
		}, {

            // Basic Product Info
            name : req.body.name,
            shortDescription : req.body.shortDescription,
            longDescription : req.body.longDescripton,
            price : req.body.price,
            nutritionDetails : req.body.nutritionDetails,
            manufacturer : req.body.manufacturer,
            expirationDate : req.body.expirationDate,
            updateDate : Date.now()

		}).exec(function(error, updated) {

			if (error) {
				req.flash("errors", error);
				res.redirect("/admin/product/" + req.body.productId + "/edit");
			} else {
				req.flash("success", "Product successfully updated.");
				res.redirect("/admin/product/index");
			}
		});
	},

	"destroy" : function(req, res) {

		product.destroy({
			id : req.param("id")
		}).exec(function(error, deletedProduct) {

			if (error) {
				res.json({
					error : error,
					success : false,
					status : 304
				});
			} else {
				res.json({
					name : deletedProduct[0].name,
					productId : deletedProduct[0].id,
					success : true,
					status : 200
				});
			}
		});
	},

	"search" : function(req, res) {
		res.view();
	},
	
	"searchResults" : function(req,res){
		
		var searchString = req.query.query + "%";

		product.find({ $or : [
			{ like : { name: searchString } }
        ]},
            function(error, result){
			
			if (error || result.length == 0){
				res.json({
					err : error, message : "Cannot find product.", success: false,
					status : 304
				});
			} else{
				res.json({
					success: true, status : 200, products : result
				});
			}			
		});		
	}
};

