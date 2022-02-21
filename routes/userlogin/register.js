const User = require('../../models/user')
const bcrypt = require('bcryptjs')

const registerUser = async (req,res) => {
    try{
        // await user.save()
        // res.send(user);

        const {username, email, password} = req.body

        if(!username){
          res.status(409).send({message:'username is not present', status: 409})
        }

        if(!email){
          res.status(409).send({message: 'email is not present', status: 409})
        }

        if(!password){
          res.status(409).send({message: 'Please provide password', status: 409})
        }
    
        const alreadyUser = await User.findOne({email})
        if(alreadyUser){
          res.status(409).send({message:'User with this email already Exist, Please login with different email', status: 409})
        }
    
        encryptedUserPassword = await bcrypt.hash(password,10)
    
        const newUser = new User({
          username,email,password: encryptedUserPassword
        })
        await newUser.save()
        const resmsg = {message: "User Created Successfully",username,email}
        console.log(newUser)
        res.status(200).send({status: 200,message: "User Created Successfully",newUser})

    }catch (error){
      console.log(error)
      res.status(500).send({error: 'Something went wrong'});
    }
}

module.exports = {registerUser}