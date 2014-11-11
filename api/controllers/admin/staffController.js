var awsConfig = sails.config.awsConfig;

module.exports = {

	"index" : function(req, res) {

		staff.find().exec(function(error, members) {
			if (error) {
				req.flash("errors", error);
				return 0;
			} else {
				res.view({
					staffMembers : members
				});
			}
		});
	},

	"show" : function(req, res) {

		staff.find({
			id : req.param("id")
		}).populate("city").populate("country").exec(function(error, staffMember) {

			if (error || staffMember.length == 0) {
				res.view("errors/genericError", {
					err : error,
					message : "Cannot find member with id: " + req.param("id")
				});
			} else {
				res.view({
					member : staffMember[0]
				});
			}
		});
	},

	"new" : function(req, res) {

		return cityService.getAllCitiesParsed().then(function(citiesResult) {
			return countryService.getCountriesParsed().then(function(countriesResult) {
				res.view({
					cities : citiesResult,
					countries : countriesResult
				});
			}, function(error) {
				res.view("errors/genericError", {
					err : error,
					message : "Cannot load countries."
				});
			});
		}, function(error) {
			res.view("errors/genericError", {
				err : error,
				message : "Cannot load cities."
			});
		});
	},

	"create" : function(req, res) {

		//console.log("\nparams ", req.params.all());

		if (req.body.password != req.body.passwordConfirmation) {
			req.flash("errors", "Password doesn't match Password Confirmation.");
			res.redirect("admin/staff/new");
		} else {
			req.file("image").upload({
				adapter : require("skipper-s3"),
				key : awsConfig.APIkeys.accessKeyId,
				secret : awsConfig.APIkeys.secretAccessKey,
				bucket : awsConfig.s3.bucket,
				region : awsConfig.s3.region
			}, function uploadFinished(error, uploaded) {

				if (error) {
					req.flash("errors", error);
					res.redirect("admin/staff/new");
				} else {
					
					console.log("UPLOAD SUCCESSED: ", uploaded);

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
						salary : req.body.salary == "" ? 0 : req.body.salary //defaultsTo not working at the moment (somekind of a bug in sails). maybe in next version?!

					}).exec(function(error, user) {
						if (error) {
							req.flash("errors", error);
							res.redirect("/admin/staff/new");
						} else {
							req.flash("success", "Staff member successfully created.");
							res.redirect("/admin/staff/index");
						}
					});
				}
			});
		}
	},

	"edit" : function(req, res) {

		staff.find({
			id : req.param("id")
		}).populate("city").exec(function(error, memberArr) {

			if (error || memberArr.length == 0) {
				res.view("errors/genericError", {
					err : error,
					message : "Cannot find member with id: " + req.param("id")
				});
			} else {

				return cityService.getAllCitiesParsed().then(function(citiesResult) {
					return countryService.getCountriesParsed().then(function(countriesResult) {
						res.view({
							member : memberArr[0],
							cities : citiesResult,
							countries : countriesResult
						});
					}, function(error) {
						res.view("errors/genericError", {
							err : error,
							message : "Cannot load countries."
						});
					});
				}, function(error) {
					res.view("errors/genericError", {
						err : error,
						message : "Cannot load cities."
					});
				});
			}
		});
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

	"getData" : function(req, res) {
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
					hireday : user[0].hireDate,
					city : user[0].city,
					country : user[0].country
				});
			}
		});

	},

	"search" : function(req, res) {

		return cityService.getAllCitiesParsed().then(function(result) {
			res.view({
				cities : result,
				adminSelect : [{
					value : 1,
					text : "Yes"
				}, {
					value : 0,
					text : "No"
				}]
			});
		}, function(error) {
			res.view("errors/genericError", {
				err : error,
				message : "Cannot load cities."
			});
		});
	},

	"searchResults" : function(req, res) {

		var searchParams = [];
		searchParams.push(req.query.query);

		if (req.query.city)
			searchParams.push(req.query.city);

		if (req.query.admin) {
			searchParams.push(req.query.admin == 0 ? false : true);
		}

		if (searchParams.length > 1) {

			staff.find().where({

				//not sure if this is the right case...check this!!
				city : searchParams[1],
				isAdmin : searchParams[2],
				or : [{
					like : {
						firstName : searchParams[0] + "%"
					}
				}, {
					like : {
						lastName : searchParams[0] + "%"
					}
				}, {
					like : {
						email : searchParams[0] + "%"
					}
				}]
			}).exec(function(error, result) {
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
		} else {

			//eventually, optimize this query
			staff.find({
				$or : [{
					like : {
						firstName : searchParams[0] + "%"
					}
				}, {
					like : {
						lastName : searchParams[0] + "%"
					}
				}, {
					like : {
						email : searchParams[0] + "%"
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

	}
};

