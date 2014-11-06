module.exports = {

	schema : true,

	attributes : {

		id : {
			type : "string",
			required : true,
			unique : true,
			primaryKey : true
		},
		cityName : {
			type : "string",
			required : true
		},

		staff : {
			collection : "staff",
			via : "city"
		}

	}
}; 