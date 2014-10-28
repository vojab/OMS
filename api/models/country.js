module.exports = {

	schema : true,

	attributes : {

		id : {
			type : "string",
			required : true,
			unique : true,
			primaryKey : true
		},
		countryName : {
			type : "string",
			required : true
		},

		staff : {
			collection : "staff",
			via : "country"
		}

	}
}; 