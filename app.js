const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser=require('body-parser')
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/contactdance');
}

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    adress: String,
    review: String,
  });

  const contact = mongoose.model('Contact', contactSchema);

const port = 80;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var mydata=new contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved to database");
    }).catch(()=>{
        res.status(404).send("This item is not saved in database");
    })

    // res.status(200).render('contact.pug')
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
