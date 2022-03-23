const nedb = require('nedb');
const express = require('express');
const path = require("path");
const app = express();

app.use (express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, './public' )));

const db= new nedb({filename: 'forum.db', autoload:true});

app.get('/', function (req,res){
    res.sendFile(path.join(__dirname, './public/landingpage.html'));
 });


 app.listen(3000, ()=> {
    console.log("Server listening on port: 3000");
});
