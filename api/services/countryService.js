var Q = require("q");

module.exports = {

	getCountriesParsed : function(callback) {

    	var deferred = Q.defer();

		country.find().exec(function(error, result) {

			if (error || result.length == 0) {

				var errorObj = {
					err : error,
					message : "Could not load countries."
				};
				deferred.resolve(errorObj);

			} else {

				var allCountries = [];

				result.forEach(function(country) {
					var tempCountry = {
						value : country.id,
						text : country.countryName
					};

					allCountries.push(tempCountry);
				});

				deferred.resolve(allCountries);
			}
		});
		
		return deferred.promise;
	}
};
