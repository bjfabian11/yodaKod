const bcrypt = require('bcryptjs')
const User = require('../database/models/User')
 
module.exports = (req, res) => {
    const {
        email,
        password
    } = req.body;
    // try to find the user
    User.findOne({
        email
    }, (error, user) => {
        if (user) {
            // compare passwords.
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id
                    req.session.save(function(){
                        res.redirect('/feed');
                    })
                    console.log('passwords matched')
                } else {
                    res.redirect('/')
                    console.log('passwords did not match')
                }
            })
        } else {  
            console.log('could not find user')
            return res.redirect('/')
            

        }
    })
}