module.exports = {

	"index" : function(req, res) {

		staff.find().where({}).exec(function(error, result) {
			if (error) {
				req.flash("errors", error);
				return 0;
			} else {
				res.view({
					staffMembers : result
				});
			}
		});
	},

	"show" : function(req, res) {

		staff.find({
			id : req.param("id")
		}, function(error, user) {
			if (error || user.length == 0) {
				res.view("errors/genericError", {
					err : error,
					message : "Cannot find that user."
				});
			} else {
				res.view({
					member : user[0]
				});
			}
		});
	},

	"new" : function(req, res) {
		
		city.find({}, function(error, result) {
			
			if (error || result.length == 0) {
				res.view("errors/genericError", {
					err : error,
					message : "Cannot load cities."
				});
			} else {

				var allCities = [{
					value : 0,
					text : ""
				}];

				result.forEach(function(item) {
					var tempCity = {
						value : item.id,
						text : item.cityName
					};

					allCities.push(tempCity);
				});

				res.view({
					cities : allCities
				});
			}
		});

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
			isAdmin : req.body.isAdmin != undefined,
			hireDate : req.body.hireDate,
			jobTitle : req.body.jobTitle,
			salary : req.body.salary == "" ? 0 : req.body.salary //defaults_to not working at the moment (somekind of a bug in sails). maybe in next version?!

		}).exec(function(error, user) {
			if (error) {
				req.flash("errors", error);
				res.redirect("/admin/staff/new");
			} else {
				req.flash("success", "Staff member successfully created.");
				res.redirect("/admin/staff/index");
			}
		});
	},

	"edit" : function(req, res) {
		sails.controllers["admin/staff"].show(req, res);
	},

	"update" : function(req, res) {

		staff.update({
			id : req.body.member_id
		}, {

			//basic info
			firstName : req.body.firstName,
			lastName : req.body.lastName,
			email : req.body.email,
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
			isAdmin : req.body.isAdmin != undefined,
			hireDate : req.body.hireDate,
			jobTitle : req.body.jobTitle,
			salary : req.body.salary == "" ? 0 : req.body.salary

		}).exec(function(error, updated) {

			if (error) {
				req.flash("errors", error);
				res.redirect("/admin/staff/" + req.body.member_id + "/edit");
			} else {
				updated.length == 0 ? req.flash("success", "Nothing to update.") : req.flash("success", "Staff member successfully updated.")
				res.redirect("/admin/staff/index");
			}
		});
	},

	"destroy" : function(req, res) {

		staff.destroy({
			id : req.param("id")
		}).exec(function(error, deletedUser) {

			if (error) {
				res.json({
					error : error,
					success : false,
					status : 304
				});
			} else {
				res.json({
					username : deletedUser[0].firstName + " " + deletedUser[0].lastName,
					user_id : deletedUser[0].id,
					success : true,
					status : 200
				});
			}
		});
	},

	"getDates" : function(req, res) {
		staff.find({
			id : req.param("id")
		}, function(error, user) {
			if (error || user.length == 0) {
				res.json({
					err : error,
					message : "Cannot find dates data.",
					success : false,
					status : 304 //change this status code to appropriate...
				});
			} else {
				res.json({
					success : true,
					status : 200,
					birthday : user[0].birthDate,
					hireday : user[0].hireDate
				});
			}
		});

	},

	"search" : function(req, res) {
		res.view();
	},

	"searchResults" : function(req, res) {

		var searchString = req.query.query + "%";

		//eventually, optimize this query
		staff.find({
			$or : [{
				like : {
					firstName : searchString
				}
			}, {
				like : {
					lastName : searchString
				}
			}, {
				like : {
					email : searchString
				}
			}]
		}, {
			firstName : 1,
			lastName : 1,
			email : 1,
			isAdmin : 1
		}, function(error, result) {

			if (error || result.length == 0) {
				res.json({
					err : error,
					message : "Cannot find staff member.",
					success : false,
					status : 304 //(change status code)
				});
			} else {
				res.json({
					success : true,
					status : 200,
					members : result
				});
			}
		});
	}
};

