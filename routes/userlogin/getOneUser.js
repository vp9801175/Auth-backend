const User = require('../../models/user')

const getOneUsers = async (req, res) =>{
    try {

        const {_id} = req.query

        if(!_id){
            return res.send({message: 'Please provide Id'})
        }

        const oneUser = await User.findOne({_id})
        
        return res.send({oneUser})
    } catch (error) {
        console.log(error)
        return res.send({status: 400, message: "Users Not found"})
    }
}

module.exports = {getOneUsers}