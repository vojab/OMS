
module.exports = {

	"index" : function(req, res) {

		staff.find().where({}).exec(function(error, result) {

			if (error) {
				req.flash("errors", error);
				return 0;
			} else {
				res.view({ staffMembers : result});
			}

		});
	},

	"show" : function(req, res) {

	},

	"new" : function(req, res) {
		res.view();
	},

	"create" : function(req, res) {	

		if (req.body.password != req.body.passwordConfirmation) {
			req.flash("errors", "Password doesn't match Password Confirmation.");
			res.redirect("admin/staff/new");
		}
		
		staff.create({
			
			//basic info
			id : helperService.createGUID(),
			firstName : req.body.firstName,
			lastName : req.body.lastName,
			email : req.body.email,
			encryptedPassword : req.body.password,
			birthDate : req.body.birthDate,
			placeOfBirth : req.body.placeOfBirth,
						
			//contact info
			address : req.body.address,
			zipCode : req.body.zipCode == "" ? 0 : req.body.zipCode,
			city : req.body.city,
			country : req.body.country,
			phoneNumber1 : req.body.phoneNumber1,
			phoneNumber2 : req.body.phoneNumber2,
			
			//other info
			isAdmin : req.body.isAdmin != "undefined" ? true : false,
			hireDate : req.body.hireDate,
			jobTitle : req.body.jobTitle,
			salary : req.body.salary == "" ? 0 : req.body.salary //defaults_to not working at the moment (somekind of a bug in sails). maybe in next version?!
			
		}).exec(function(error, user) {
			if (error) {
				req.flash("errors", error);
				res.redirect("/admin/staff/new");
			} else {
				req.flash("success", "Staff member successfully created.");
				res.redirect("/admin/staff");
			}
		});
	},

	"edit" : function(req, res) {

	},

	"update" : function(req, res) {

	},

	"destroy" : function(req, res) {

	}
};

