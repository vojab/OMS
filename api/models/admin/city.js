module.exports = {

	schema : true,

	attributes : {
		
		id : { type : "string", required : true, unique: true },
		cityName: { type: "string", required : true }
	}
};