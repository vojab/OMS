/*
 I created this simple GUID generator, just for demo purposes. Currently, it consists of only 8 characters.
 Guess, that should be enough :-).
 We should make it a little bit robust and "complex", later, or smt.
 */

module.exports = {

	createGuid : function() {

		var S4 = function() {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};

		//var guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
		var guid = (S4() + S4()).toLowerCase();
		return guid;
	}
};
