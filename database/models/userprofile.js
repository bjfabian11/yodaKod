const mongoose = require('mongoose');

const UserprofileSchema = new mongoose.Schema({
	username: String,
	firstName: String,
	lastName: String,
    image: String,
    link1: String,
    link2: String,
    bio: String,
	createdAt: {
		type: Date,
		default: new Date()
	}
});

const Userprofile = mongoose.model('Userprofile', UserprofileSchema);

module.exports = Userprofile