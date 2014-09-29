
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
		
		console.log("REQ.body ", req.body);

		if (req.body.password != req.body.passwordConfirmation) {
			req.flash("errors", "Password doesn't match Password Confirmation.");
			res.redirect("admin/staff/new");
		}

		staff.create({
			id : helperService.createGUID(),
			firstName : req.body.firstName,
			lastName : req.body.lastName,
			email : req.body.email,
			encryptedPassword : req.body.password
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

