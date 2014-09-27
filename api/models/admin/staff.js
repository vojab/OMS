module.exports = {

	schema : true,

	attributes : {

		id : {
			type : "string"
		},
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
		encryptedPassword : {
			type : "string",
			required : true
		}
	},

	//callbacks
	beforeCreate : function(self, next) {

		require("bcrypt").hash(self.encryptedPassword, 10, function passwordEncrypted(error, encryptedPass) {
			if (error) {				
				return next(error);
			}
			self.encryptedPassword = encryptedPass;
			next();
		});
	}
};
