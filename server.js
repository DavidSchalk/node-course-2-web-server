const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname + '/views'));

app.use((req,res,next) =>
{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url} \n`;

    fs.appendFile("server.log",log,(err) =>
    {
        if(err)
        {
            console.log('Unable to append to server.log');
        }
    });
    next();
});
// app.use((req,res,next) =>
// {
//     res.render('maintenance.hbs',
//     { });
    
// });
hbs.registerHelper('getCurrentYear', () =>
{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text) =>
{
    return text.toUpperCase();
});

app.get('/',(req,res) =>
{
    res.render('index.hbs',
    {
        pageTitle: 'Home Page',
        pageContent:'Welcome bro'
    });
});
app.get('/assets',(req,res) => {
    res.render('assets');
});
app.get('/projects',(req,res) => {
    res.render('projects.hbs');
});
app.get('/cv',(req,res) => {
    res.render('cv.hbs');
});
app.get('/hire-me',(req,res) => {
    res.render('hire-me.hbs');
});

app.get('/bad',(req,res) =>
{
    res.send({
        errorMessage:'Unable to handle request'
    });
});

app.listen(port);
