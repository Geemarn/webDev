var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
	name:String,
	price: Number,
	image:String,
	description:String,
	createdAt: {type: Date, default: Date.now },
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ],
   owner: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
});

module.exports = mongoose.model("Campground", campgroundSchema);