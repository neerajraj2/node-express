const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
  
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('unable to write into log file.');
        }
    });
  
    next();
  });

app.get('/',(req,res)=>{
    res.send({
        name:'Neeraj',
        address:'Delhi',
        City:[
            'Delhi',
            'Moradabad'
        ]
    });
});

app.get('/home',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home Title'
   });
 });

app.get('/about',(req,res)=>{
   res.render('about.hbs',{
       pageTitle:'About Title'
   });
});




app.listen(2000,()=>{
    console.log('Server is up on port 3000');
}); 
