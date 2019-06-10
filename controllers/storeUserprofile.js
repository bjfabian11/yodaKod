const path = require('path');

const Userprofile = require('../database/models/Userprofile');


module.exports = (req, res)=>{

	const { image } = req.files

	image.mv(path.resolve(__dirname, '..', 'public/userprofile', image.name), (error)=>{

		Userprofile.create({
			...req.body,
			image: `/userprofile/${image.name}`
		}, (error, Userprofile)=>{
			res.redirect('/profile');
	});

	});
}