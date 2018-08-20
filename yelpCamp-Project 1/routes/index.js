var express = require("express"),
	router  = express.Router(),
	passport = require("passport"),
	User    = require("../models/user");
//show register form//
router.get("/register", function(req, res){
	res.render("register", {page: "register"});
});
/// register logic ////
router.post("/register", function(req, res){
	newUser = new User({
		username: req.body.username
		});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			res.redirect("/register");
		}else{
			passport.authenticate("local")(req, res, function(){
				req.flash("success", "WELCOME TO YELP CAMP " + user.username.toUpperCase());
				res.redirect("/campgrounds");
			});
		};
	});
});
/// login form ///
router.get("/login", function(req, res){
	res.render("login", {page: "login"});
});
/// login logic //
router.post("/login", passport.authenticate("local", {
	successRedirect:"/campgrounds",
	failureRedirect: "/login"
}), function(req, res){
});
///logout /////
router.get("/logout", function(req, res){
	req.logout();
	req.flash( "success", "LOGGED OUT SUCCESSFUL!");
	res.redirect("/campgrounds");
});

module.exports = router;