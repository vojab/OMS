
module.exports = {
	
	"index" : function(req, res){		
		res.view();
	},
	
	"show" : function(req, res){
		
	},
	
	"new" : function(req, res){
		res.view();
	},
	
	"create" : function(req, res){	
		
		if (req.body.password != req.body.passwordConfirmation){
			req.flash("errors", "Password doesn't match Password Confirmation.");
			res.redirect("admin/staff/new");
		}
			
		staff.create({
			id : helperService.createGUID(),
			firstName : req.body.firstName,
			lastName : req.body.lastName,
			email : req.body.email,
			encryptedPassword : req.body.password
			//todo -> fix fuckedup dates in collection... schema thing (!?!?!)			
		}).exec(function(error, user) {
			if (error) {							
				req.flash("errors", error);
				res.redirect("/admin/staff/new");				
			} else {
				req.flash("success", "Staff member successfully created.");
				res.redirect("/admin/staff");
			}
		});
		
	},
	
	"edit" : function(req, res){
		
	},
	
	"update" : function(req, res){
		
	},
	
	"destroy" : function(req, res){
		
	}
	
};

