const User = require('../../models/user')

const getOneUsers = async (req, res) =>{
    try {

        const query = req.query

        if(Object.keys(query).length==0){
            return res.send({message: 'Please provide user_id or username or email address'})
        }
        const oneUser = await User.findOne(query)

        if(!oneUser){
            return res.send({message: 'Please provide valid params'})
        }

        return res.send(oneUser)

    } catch (error) {
        console.log(error)
        return res.send({status: 400, message: "Users Not found"})
    }
}

module.exports = {getOneUsers}