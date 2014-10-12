module.exports = {

	schema : true,

	attributes : {

        // Basic Product Info

		id : { type : "string" },
        shortDescription : { type : "string", unique : true, required : true 	},
        longDescription : { type : "string" },
        price : { type : "decimal", required : true },
		encryptedPassword : { type : "string", required : true },
        nutritionDetails : { type : "string" },
        manufacturer : { type : "string" },
        expirationDate : { type : "date" },
        entryDate : { type : "date" },
        updateDate : { type : "date" }

	}

};