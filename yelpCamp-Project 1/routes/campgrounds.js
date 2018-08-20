var express     = require("express"),
	Campground  = require("../models/campground"),
	router      = express.Router(),
	middleware  = require("../middleware");
//////// LANDING ROUTE /////////
router.get("/", function(req, res){
	res.render("landing");
});
///////// INDEX ROUTE //////////
router.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, campgrounds){
		if(err){
			res.render("landing");
			console.log(err);
		}else{
			res.render("campground/index", {campgrounds: campgrounds, page: "campgrounds"});
		};
	});
});
//////// NEW ROUTE ////////////
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
	res.render("campground/new");
});
//////// CREATE ROUTE /////////
router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
	Campground.create(req.body.newCamp, function(err, newcamp){
		if(err){
			req.flash("error", "SOMETHING WENT WRONG!! TRY AGAIN");
			console.log(err);
		}else{
			newcamp.owner.id =req.user._id;
			newcamp.owner.username = req.user.username;
			newcamp.save();
			req.flash("success", "CREATED CAMPGROUND SUCCESSFUL!!");
			res.redirect("/campgrounds");
		};
	});
});
/////////// SHOW ROUTE ////////////// 
router.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundcamp){
		if(err){
			req.flash("error", " SOMETHING WENT WRONG!!");
			res.redirect("/campgrounds");
			console.log(err);
		}else{
			res.render("campground/show", {campground: foundcamp})
		};
	});
});
/////// EDIT ROUTE ///////
router.get("/campgrounds/:id/edit", middleware.confirmowner, function(req, res){
	Campground.findById(req.params.id, function(err, editcamp){
		if(err){
			req.flash("error", "SOMETHING WENT WRONG!!");
			res.redirect("back");
			console.log(err);
		}else{
			res.render("campground/edit", {editcamp: editcamp});
			};
	});
});
///// UPDATE ROUTE /////
router.put("/campgrounds/:id", middleware.confirmowner, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.newCamp, function(err, updatecamp){
		if(err){
			req.flash("error", "SOMETHING WENT WRONG!! TRY AGAIN");
			res.redirect("back");
		}else{
			req.flash("success", req.body.newCamp.name.toUpperCase() + " EDIT SUCCESSFUL");
			res.redirect("/campgrounds/" + updatecamp._id);
		};
	});
});
///// DELETE ROUTE ///////
router.delete("/campgrounds/:id", middleware.confirmowner, function(req, res){
	Campground.findByIdAndDelete(req.params.id, function(err, deletecamp){
		if(err){
			req.flash("error", "TRY AGAIN!!");
			res.redirect("back");
			console.log(err);
		}
		req.flash("success", "DELETE CAMPGROUND SUCCESSFUL!!");
		res.redirect("/campgrounds");
	});
});

module.exports = router;