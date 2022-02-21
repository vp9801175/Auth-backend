const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;

        if(!email){
            return res.status(409).send({message: 'email is required', status: 409})
        }

        if(!password){
            return res.status(409).send({message: 'Please provide password', status: 409})
        }

        const checkUser = await User.findOne({email})

        if(!checkUser){
            return res.status(409).send({message: 'user not present, Please register', status: 409})
        }

        const isPasswordValid = await bcrypt.compareSync(password,checkUser.password)

        if(!isPasswordValid){
            return res.status(409).send({message: 'Password is incorrect', status: 409})
        }

        const token = jwt.sign({user_id:checkUser._id, email, username: checkUser.username},process.env.TOKEN_KEY, {expiresIn: '1h'})
        checkUser.token = token
        checkUser.save();

        return res.status(200).send(checkUser)
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

module.exports = {loginUser}