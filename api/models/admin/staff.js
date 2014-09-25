module.exports = {
	
	schema : true,

	attributes : {

		firstName : {
			type : "string",
			required : true
		},

		lastName : {
			type : "string",
			required : true
		},

		email : {
			type : "string",
			email : true,
			unique : true,
			required : true
		},

		encrypted_password : {
			type : "string"
		},
		
		id : {
			type: "string"
		}
	}
};