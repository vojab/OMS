module.exports = {

	schema : true,

	attributes : {

		//basic
		id : { type : "string" },
		firstName : { type : "string", required : true 	},
		lastName : { type : "string", required : true },
		email : { type : "string", email : true, unique : true, required : true },
		encryptedPassword : { type : "string", required : true },
		birthDate : { type : "date" },
		placeOfBirth : { type : "string" },
		
		//contact
		address : { type : "string" },
		zipCode : { type : "integer", defaultsTo: 0 }, 
		//city : { type : "string" }
		city: {
      model: "city"
   },
		
		country : { type : "string" },
		phoneNumber1 : { type : "string"},
		phoneNumber2 : { type : "string"},
		
		//other
		isAdmin : { type : "boolean", defaultsTo: false },
		hireDate : { type : "date" },
		jobTitle : { type : "string"},
		salary : { type : "float", defaultsTo: 0 }
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