const mongoose = require('mongoose')
const username = 'Store'
const password = 'Store'
const uri = `mongodb+srv://${username}:${password}@cluster0.qhbhk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

exports.connect = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(res => {
        console.log('Database connected SUCCESSFULLY!!')
    }).catch(err => {
        console.log('Database connection UNSUCCESSFUL...')
    });

    process.on('SIGINT', function() {   
        mongoose.connection.close(function () { 
          console.log('Database Disconnected SUCCESSFUL...'); 
          process.exit(0); 
        }); 
    });
}

