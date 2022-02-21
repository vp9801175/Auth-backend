const welcome = (req,res) => {
    return res.send({status: 200,message: "Welcome to create User"})
}

module.exports = welcome