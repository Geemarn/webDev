var express     = require("express"),
    Campground  = require("../models/campground"),
	Comment     = require("../models/comment"),
	router      = express.Router({mergeParams: true}),
	middleware  = require("../middleware");
////////// NEW COMMENT ROUTE /////////
router.get("/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.render("campground/show");
		}else{
			res.render("comment/new", {campground: campground})
		};
	});
});
///////// CREATE COMMENT ROUTE ////////
router.post("/", middleware.isLoggedIn, function(req, res){
Campground.findById(req.params.id, function(err, campground){
	if(err){
		console.log(err);
		res.render("campground/show");
	}else{
		Comment.create(req.body.comment, function(err, comment){
			comment.author.id =req.user._id;
			comment.author.username = req.user.username;
			comment.save();
			campground.comments.push(comment);
			campground.save();
			req.flash("success", "NEW COMMENT ADDED")
			res.redirect("/campgrounds/" + campground._id);
		});
	};
});
});
////// EDIT COMMENT ROUTE /////
router.get("/:Cid/edit", middleware.checkCommentOwner, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			res.render("campground/show");
		}else{
			Comment.findById(req.params.Cid, function(err, editcomment){
				if(err){
					res.render("campground/show");
				}else{
					res.render("comment/edit", {comment: editcomment, campground:campground});
				};
			});
		};
	});
});
///// UPDATE ROUTE //////
router.put("/:Cid", middleware.checkCommentOwner, function(req, res){
	Comment.findByIdAndUpdate(req.params.Cid, req.body.comment, function(err, updatecamp){
		if(err){
			res.redirect("back");
		}else{
			req.flash("success", "NEW COMMENT EDITED")
			res.redirect("/campgrounds/" + req.params.id);
		};
	});
});
/// DELETE ROUTE ///
router.delete("/:Cid", middleware.checkCommentOwner, function(req, res){
	Comment.findByIdAndRemove(req.params.Cid, function(err, delcomment){
		if(err){
			req.flash("error", "Cannot delete comment!! try again")
		}else {
			req.flash("success", "COMMENT DELETED!!")
			res.redirect("/campgrounds/" + req.params.id)
		};
	});
});

module.exports = router;