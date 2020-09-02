const express = require('express')
const mongoose  = require('mongoose')

// To avoid Deprecation Warnings
mongoose.set('useFindAndModify', false);

const apiRoute = require('./routes/api')

const app = express()
app.use(express.json())
app.use('/api', apiRoute)

mongoose.connect('mongodb://localhost/backend', { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
   if(err) 
        console.log(err)
   else 
        console.log('Connected to DataBase');
});

app.listen(3000, () => console.log('Server Running !!'))