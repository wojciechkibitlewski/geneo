const userDB = {
    users: require('../models/user.json'),
    setUsers: function (data) {this.users = data}
}

require('dotenv').config();
const fsPromisses = require('fs').promises;
const path = require('path');

const handleLogout = async(req, res) =>{
   
    const cookies = req.cookies;
    if(!cookies?.jwt)  return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    /// czy refreshToken jest w bazie danych?
    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
    if(!foundUser) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204);
    }

    // usuwamy refreshToken
    const otherUsers = userDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = {... foundUser, refreshToken: ''};
    
    userDB.setUsers([...otherUsers, currentUser]);
    await fsPromisses.writeFile(
        path.join(__dirname, '..', 'models', 'user.json' ),
        JSON.stringify(userDB.users)
    );
    
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: 'None',
        secure: true
      });
    res.sendStatus(204);
    
}

module.exports = {handleLogout};