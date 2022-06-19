const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/RegistrationDetails', {useNewUrlParser: true});

//Define mongoose schema
const RegistrationSchema = new mongoose.Schema({
    Username: String,
    Email: String,
    Password: String,
  });


const Registration = mongoose.model('Registration', RegistrationSchema);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log("we're connected!")
});

app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())
app.set('view engine', 'htm') // Set the template engine as html
app.engine('htm', require('ejs').renderFile)

app.set('views', path.join(__dirname, 'views')) // Set the views directory

app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {}
    res.status(200).render('index.htm');
})

app.get('/hrx_blackShoe.htm', (req, res)=>{
    res.status(200).render('hrx_blackShoe.htm');
})

app.get('/cart.htm', (req, res)=>{
    res.status(200).render('cart.htm');
})

app.get('/account.htm', (req, res)=>{
    res.status(200).render('account.htm');
})

app.get('/index.htm', (req, res)=>{
    res.status(200).render('index.htm');
})

app.get('/contact.htm', (req, res)=>{
    res.status(200).render('contact.htm');
})

app.get('/about.htm', (req, res)=>{
    res.status(200).render('about.htm');
})

app.get('/products.htm', (req, res)=>{
    res.status(200).render('products.htm');
})

app.get('/PUMA_blueTshirt.htm',(req,res)=>{
    res.status(200).render('PUMA_blueTshirt.htm');
})

app.get('/PUMA_redTshirt.htm',(req,res)=>{
    res.status(200).render('PUMA_redTshirt.htm');
})

app.get('/sneakerNike.htm',(req,res)=>{
    res.status(200).render('sneakerNike.htm');
})

app.get('/sneakerNike.htm',(req,res)=>{
    res.status(200).render('sneakerNike.htm');
})

app.get('/TrackPant.htm',(req,res)=>{
    res.status(200).render('TrackPant.htm');
})

app.post('/account', (req, res)=>{
    var RegData = new Registration(req.body);
    RegData.save().then(()=>{
        res.end("This item has been send to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    
    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});