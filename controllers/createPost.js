const User = require('../database/models/User')

module.exports = async (req, res) => {
    const user = await User.findOne({ _id: req.session.userId })
    if (req.session.userId) {
        
        return res.render('create', {
        user: user
        });
    }

    res.redirect('/auth/login')
}