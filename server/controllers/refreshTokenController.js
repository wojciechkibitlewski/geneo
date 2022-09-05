const userDB = {
    users: require('../models/user.json'),
    setUsers: function (data) {this.users = data}
}

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async(req, res) =>{
    
    const cookies = req.cookies;
    if(!cookies?.jwt)  return res.sendStatus(400);
    //console.log(cookies.jwt);
    const refreshToken = cookies.jwt;


    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
    if(!foundUser) return res.sendStatus(403);
    
    jwt.verify( 
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "email": decoded.email},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s'}
            );
            res.json({accessToken})
        }
    )
    
}

module.exports = {handleRefreshToken};