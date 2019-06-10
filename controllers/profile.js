const User = require('../database/models/User');
const Post = require('../database/models/post');
const Userprofile = require('../database/models/Userprofile')

module.exports = async (req, res) => {
	const user = await User.findOne({ _id: req.session.userId }, async (err, user) => {
	const posts = await Post.find({username: user.username}).sort({$natural:-1});
	const userprofile = await Userprofile.findOne({username: user.username}).sort({$natural:-1});
	res.render('profile', { 
		user: user,
		posts,
		userprofile
		});
		console.log(err, user, posts, userprofile)
	});
}
