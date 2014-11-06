/* This is service for helper methods */

module.exports = {

	// I created this simple GUID generator, just for demo purposes. Currently, it consists of only 8
	// characters. Guess, that should be enough :-).
	// We should make it a little bit robust and "complex", later, or smt.

	createGUID : function(shortGuid) {

		var S4 = function() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};
		
		if (shortGuid){
			var guid = S4().toLowerCase();
			return guid;
		}

		//var guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
		var guid = (S4() + S4()).toLowerCase();
		return guid;
	}
};
