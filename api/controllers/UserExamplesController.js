
var GUID_helper = require("../helpers/GUID.js");

module.exports = {
	
	"index" : function(req, res){
		res.view();
	},

	"new" : function(req, res) {
		res.view();
	},

	"create" : function(req, res) {
		
		UserExample.create({
			id : GUID_helper.createGuid(),
			firstName : req.body.firstName,
			lastName : req.body.lastName,
			email : req.body.email,
			encrypted_password : req.body.password
			
		}).exec(function(error, user) {
			if (error) {							
				req.flash("errors", error);
				res.redirect("/username/new");				
			} else {
				req.flash("success", "Account successfully created.");
				res.redirect("/userexamples/index");
			}
		});

		//We can use this approach as well.
		
		//using req.params.all()
		// UserExample.create(req.params.all(), function userCreated(error, user) {
		//
		// console.log(req.params.all());
		// if (error) {
		// req.flash("errors", error.invalidAttributes);
		// return res.redirect("/userexamples/new");
		// }
		//
		// req.flash("success", "Account successfully created.");
		// res.redirect("/login");
		// });
	}
};

