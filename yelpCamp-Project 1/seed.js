var mongoose = require("mongoose"),
	Campground  = require("./models/campground");
	Comment  = require("./models/comment");

var campground = [
		{
			name: "flower_villa",
			image: "flower.jpg",
			description: "beautiful place where flowers blossom"
		},
		{
			name: "desert",
			image: "desert.jpg",
			description: "in here atmosphere is scoucthing, its hell but relaxed"
		},
		{
			name: "bootcamp",
			image: "c8f4a01f1d5ab5f3f2696e2202976677.jpg",
			description: "so much love in here"
		}
				];

function seedDb(){
	Campground.remove({}, function(err){
		if(err){
			console.log("error");
		}
		console.log("removed");
		campground.forEach(function(camps){
		Campground.create(camps, function(err, newcamps){
			if(err){
				console("another error");
			}else{
				console.log("added camp ground");
				Comment.create({
					text:"this is so sad that i cant even breadth o",
					author:"gman"
				}, function(err, comment){
					if(err){
						console.log("error again again");
					}else{
						newcamps.comments.push(comment);
						newcamps.save();
					};
				});
			};
	});
});
	});
};

module.exports = seedDb;




