
const User = require('../../models/user')

const getAllUsers = async (req, res) =>{
    try {
        const users = await User.find({});  
        return res.send(users);
    } catch (error) {
        console.log(error)
        return res.send({status: 400, message: "Users Not found"})
    }
}

module.exports = {getAllUsers}