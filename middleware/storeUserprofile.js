module.exports = (req, res, next)=>{
	if(!req.files.image || !req.body.firstName || !req.body.lastName){
		return res.redirect('/userprofile/new');
	}
	next();
}