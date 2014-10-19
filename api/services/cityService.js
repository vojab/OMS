var Q = require("q");

module.exports = {

	getAllCitiesParsed : function(callback) {

		var deferred = Q.defer();

		city.find().exec(function(error, result) {

			if (error || result.length == 0) {

				var errorObj = {
					err : error,
					message : "Could not load cities."
				};
				deferred.resolve(errorObj);

			} else {

				//this sucks... but for now, Waterline doesn't have a feature to select particullar fields from MongoDB
				//although it can be "hacked" like in "staffController.searchResults" method..let's use this shitty-parsing approach, for now...
				//more on this here: https://github.com/balderdashy/waterline/issues/73

				var allCities = [];

				result.forEach(function(city) {
					var tempCity = {
						value : city.id,
						text : city.cityName
					};

					allCities.push(tempCity);
				});

				deferred.resolve(allCities);
			}
		});
		
		return deferred.promise;
	}
};
