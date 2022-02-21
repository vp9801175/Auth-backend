const express = require('express')
const Router = require('./routes/index')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json());

//Using Routes
app.use(Router);

//Connect to Database
require('./config/database').connect()


app.listen(PORT, (err) => {
    if(err){
        console.log(err)
    }
    console.log(`Server is listening on number: ${PORT}`);
})