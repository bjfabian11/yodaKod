const User = require('../database/models/User');
const Post = require('../database/models/post')

module.exports = async (req, res) => {
	const user = await User.findOne({ _id: req.session.userId }, async (err, user) => {
	const posts = await Post.find({username: user.username}).sort({$natural:-1});
	res.render('profile', { 
		user: user,
		posts
		});
		console.log(err, user, req.session.userId, posts)
	});
}
