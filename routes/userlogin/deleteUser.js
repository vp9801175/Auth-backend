const User = require('../../models/user')

const deleteUser =async (req,res) => {
    try {

        const {_id} = req.query

        if(!_id){
            return res.send({message: 'Please provide Id'})
        }

        const userDeleted = await User.deleteOne({_id})

        if(userDeleted && userDeleted.deletedCount == 0){
            return res.send({message: 'User does not exist'})
        }
        
        return res.send({userDeleted})

    } catch (error) {
        console.log(error);
        return res.send({message: 'Please provide valid Id'})
    }
}

module.exports = deleteUser