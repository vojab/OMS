module.exports = {

	citiesDropDown : function(citiesArr) {

		var allCities = [];

		if (!citiesArr || citiesArr.length == 0)
			return allCities;
		
		citiesArr.forEach(function(city) {
			var tempCity = {
				value : city.id,
				text : city.cityName
			};

			allCities.push(tempCity);
		});

		return allCities;
	}
};
