const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	title: String,
	subtitle: String,
	content: String,
	username: String,
	image: String,
	createdAt: {
		type: Date,
		default: new Date()
	}
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post