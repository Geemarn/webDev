var Campground  = require("../models/campground"),
	Comment     = require("../models/comment");

var middlewareObj = {
	confirmowner: function(req, res, next){ ////confirm owner ////////
		if(req.isAuthenticated()){
			Campground.findById(req.params.id, function(err, camp){
			if(err){
				res.redirect("back");
			}else{
				if(camp.owner.id.equals(req.user._id)){
					next();
				}else{
					res.redirect("back");
				};
			};
		});
		}else{
			res.redirect("back");
		};
	},
	checkCommentOwner: function(req, res, next){ //// confirm comment author/////
		if(req.isAuthenticated()){
			Comment.findById(req.params.Cid, function(err, comment){
				if(err){
					re.redirect("back");
				}else{
					if(comment.author.id.equals(req.user._id)){
						next();
					}else{
						res.redirect("back");
					};
				};
			});
		}else{
			res.redirect("back");
		};
	},
	isLoggedIn: function(req, res, next){ //// check if user is logged in //////
		if(req.isAuthenticated()){
			return next();
		}else{
			req.flash("error", "YOU NEED TO BE LOGGED IN FIRST")
			res.redirect("/login");
		};
	}
};
module.exports = middlewareObj;