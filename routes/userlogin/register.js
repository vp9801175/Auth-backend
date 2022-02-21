const User = require('../../models/user')
const bcrypt = require('bcryptjs')

const registerUser = async (req,res) => {
    try{
        // await user.save()
        // res.send(user);

        const {firstname, lastname, email, password} = req.body

        if(!firstname || !lastname){
          return res.status(409).send({message:'firstname and lastname required', status: 409})
        }

        if(!email){
          return res.status(409).send({message: 'email is not present', status: 409})
        }

        if(!password){
          return res.status(409).send({message: 'Please provide password', status: 409})
        }
    
        const alreadyUser = await User.findOne({email})
        if(alreadyUser){
          return res.status(409).send({message:'User with this email already Exist, Please login with different email', status: 409})
        }

        let usernameCreated = true
        let username = ''
        let count = 1;
        let trythis = firstname.toLowerCase()+lastname.toLowerCase()
        while(usernameCreated){
          const isUser = await User.findOne({username: trythis})
          if(!isUser){
            username = trythis
            usernameCreated = false
          }
          trythis = firstname.toLowerCase()+lastname.toLowerCase()+count
          count+=1
        }
    
        encryptedUserPassword = await bcrypt.hash(password,10)
    
        const newUser = new User({
          firstname,lastname,username,email,password: encryptedUserPassword
        })
        await newUser.save()
        const resmsg = {
          message: "User Created Successfully!!",
          username: `Please use this Username: ${username}`,
          firstname,
          lastname,
          email
        }
        console.log(resmsg)
        return res.status(200).send(resmsg)

    }catch (error){
      console.log(error)
      return res.status(500).send({error: 'Something went wrong'});
    }
}

module.exports = {registerUser}