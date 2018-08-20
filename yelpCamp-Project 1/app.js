var bodyParser            = require("body-parser"),
	mongoose              = require("mongoose"),
	passport              = require("passport"),
	localStrategy         = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	methodOverride        = require("method-override"),
	flash                 = require("connect-flash"),
	express               = require("express"),
	User                  = require("./models/user"),
	seedDb                = require("./seed"),
	app                   = express();
// seedDb();
/// requiring route
var commentRoute = require("./routes/comments");
var campgroundRoute = require("./routes/campgrounds");
var indexRoute = require("./routes/index");
 
//////////APP CONFIG ////////////
mongoose.connect("mongodb://localhost/yelp_campDatabase11");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/campgrounds", express.static("public/images"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");

///////////AUTH CONFIG ///////////
app.use(require("express-session")({
	secret: "campground password",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.success     = req.flash("success");
	res.locals.error       = req.flash("error");
	next();
})
//// MIDDLEWARE//////
app.use("/campgrounds/:id/comments", commentRoute);
app.use(campgroundRoute);
app.use(indexRoute);

app.listen(3000, "127.0.0.1", () => {
	console.log("server running at http://'127.0.0.1':3000/");
});