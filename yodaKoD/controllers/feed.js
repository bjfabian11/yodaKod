const Post = require('../database/models/post');

module.exports = async (req, res)=>{
	const posts = await Post.find({}).sort({$natural:-1});
	
	res.render('feed', {
		posts
	});
}