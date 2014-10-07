module.exports = {

	"index" : function(req, res) {

		city.find().where({}).exec(function(error, result) {
			if (error) {
				req.flash("errors", error);
				return 0;
			} else {
				res.view({
					cities : result
				});
			}
		});
	},

	"new" : function(req, res) {
		res.view();
	},

	"create" : function(req, res) {
		city.create({
			id : helperService.createGUID(true),
			cityName : req.body.cityName

		}).exec(function(error, user) {
			if (error) {
				req.flash("errors", error);
				res.redirect("/admin/cities/new");
			} else {
				req.flash("success", "City successfully created.");
				res.redirect("/admin/cities/index");
			}
		});
	},

	"edit" : function(req, res) {

		city.find({
			id : req.param("id")
		}, function(error, cityArr) {
			if (error || cityArr.length == 0) {
				res.view("errors/genericError", {
					err : error,
					message : "Cannot find that city."
				});
			} else {
				res.view({
					city : cityArr[0]
				});
			}
		});
	},

	"update" : function(req, res) {

		city.update({
			id : req.body.city_id
		}, {
			cityName : req.body.cityName
		}).exec(function(error, updated) {
			if (error) {
				req.flash("errors", error);
				res.redirect("/admin/cities/" + req.body.city_id + "/edit");
			} else {
				updated.length == 0 ? req.flash("success", "Nothing to update.") : req.flash("success", "City info. successfully updated.")
				res.redirect("/admin/cities/index");
			}
		});
	},

	"destroy" : function(req, res) {

		city.destroy({
			id : req.param("id")
		}).exec(function(error, deletedCity) {

			if (error) {
				res.json({
					error : error,
					success : false,
					status : 304
				});
			} else {
				res.json({
					cityName : deletedCity[0].cityName,
					city_id : deletedCity[0].id,
					success : true,
					status : 200
				});
			}
		});
	}
};

