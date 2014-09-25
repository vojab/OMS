
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
		staff.create({
			id : helperService.createGUID(),
			firstName : req.body.firstName,
			lastName : req.body.lastName,
			email : req.body.email,
			encrypted_password : req.body.password //todo -> add encryption
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

