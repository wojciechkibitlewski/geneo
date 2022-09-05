const userDB = {
    users: require('../models/user.json'),
    setUsers: function (data) {this.users = data}
}

const fsPromisses = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const Users = require('../models/User');

const handleNewUser = async(req, res) => {
    const {name, surname, role, active, email, pwd} = req.body;
    if(!email || !pwd)  return res.status(400).json({'message': 'Email and password are required.'})
    // check duplicate
    const duplicate = userDB.users.find(person => person.email === email);
    if (duplicate) return res.sendStatus(409); //Conflict 


    try {
        // encrypt password
        const hashedPwd = await bcrypt.hash(pwd,10);
        // store new user
        const newUser = {"email": email, "name": name, "surname": surname, "password": hashedPwd, "role": role, "active":active }
        userDB.setUsers([...userDB.users, newUser]);
        await fsPromisses.writeFile(
            path.join(__dirname, '..', 'models', 'user.json'), JSON.stringify(userDB.users)
        );
        console.log(userDB.users)
        res.status(201).json({ 'success': `New user ${email} created` })
    } catch (error) {
        res.status(500).json({ 'message': error.message})
    }
}

module.exports = {handleNewUser};



