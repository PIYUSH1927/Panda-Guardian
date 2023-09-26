const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const app = express();
const path = require('path');

const DB = 'mongodb+srv://padiapiyush12:newpassword12@cluster0.yyfi1gd.mongodb.net/pddata?retryWrites=true&w=majority'

app.use(express.static('public'));
 
app.use(bodyParser.urlencoded({ extended:true }));


mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log(`connection successful`);
}).catch((err)=>console.log(`no connection`));

const db = mongoose.connection;

db.on('error', (err) => {
    console.log('MongoDB connection error: ', err);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});





app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});
app.get('/contact', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});
app.get('/facts', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'facts.html'));
});
app.get('/statistics', function (req, res) {
    res.sendFile(path.join(__dirname, 'views', 'statistics.html'));
});



const userSchema2 = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    suggestion:String,
    feedback:String
  });
  
  
  
const UserN = mongoose.model('UserN', userSchema2);


app.post('/contact', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const suggestion = req.body.suggestion;
    const feedback = req.body.feedback;

    const newUser = new UserN({
      name,
      email,
      phone,
      suggestion,
      feedback
    });

    try {
      await newUser.save();
      res.sendFile(path.join(__dirname, 'views', 'index.html'));
    } catch (error) {
      console.error(error);
      res.status(500).send('Error saving data to the database');
    }
});




app.listen(process.env.PORT || 80, function() {
  console.log("Server has started successfully");
});