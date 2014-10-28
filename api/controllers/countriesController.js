module.exports = {

	"index" : function(req, res) {

		country.find().exec(function(error, result) {
			if (error) {
				req.flash("errors", error);
				return 0;
			} else {
				res.view({
					countries : result
				});
			}
		});
	},

	"new" : function(req, res) {
		res.view();
	},

	"create" : function(req, res) {
		country.create({
			id : helperService.createGUID(true),
			countryName : req.body.countryName

		}).exec(function(error, user) {
			if (error) {
				req.flash("errors", error);
				res.redirect("/countries/new");
			} else {
				req.flash("success", "Country successfully created.");
				res.redirect("/countries/index");
			}
		});
	},

	"edit" : function(req, res) {

		country.find({
			id : req.param("id")
		}, function(error, countryArr) {
			if (error || countryArr.length == 0) {
				res.view("errors/genericError", {
					err : error,
					message : "Cannot find that country."
				});
			} else {
				res.view({
					country : countryArr[0]
				});
			}
		});
	},

	"update" : function(req, res) {

		country.update({
			id : req.body.country_id
		}, {
			countryName : req.body.countryName
		}).exec(function(error, updated) {
			if (error) {
				req.flash("errors", error);
				res.redirect("/countries/" + req.body.country_id + "/edit");
			} else {
				updated.length == 0 ? req.flash("success", "Nothing to update.") : req.flash("success", "Country info. successfully updated.")
				res.redirect("/countries/index");
			}
		});
	},

	"destroy" : function(req, res) {

		country.destroy({
			id : req.param("id")
		}).exec(function(error, deletedCountry) {

			if (error) {
				res.json({
					error : error,
					success : false,
					status : 304
				});
			} else {
				res.json({
					countryName : deletedCountry[0].countryName,
					country_id : deletedCountry[0].id,
					success : true,
					status : 200
				});
			}
		});
	}
};

