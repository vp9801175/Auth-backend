const User = require('../../models/user')

const deleteUser =async (req,res) => {
    try {

        const query = req.query

        if(Object.keys(query).length==0){
            return res.send({message: 'Please provide user_id or username or email address'})
        }

        const userDeleted = await User.deleteOne({query})

        if(userDeleted && userDeleted.deletedCount == 0){
            return res.send({message: 'Please provide valid params'})
        }

        return res.send({message: "User deleted successfully",userDeleted})

    } catch (error) {
        console.log(error);
        return res.send({message: 'Please provide valid Id'})
    }
}

module.exports = deleteUser