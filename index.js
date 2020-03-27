const express = require("express");
const mongoose = require('mongoose');
var bodyParser = require("body-parser");

const app = express();
mongoose.connect('mongodb://localhost/todo', {useNewUrlParser: true});
var conn = mongoose.connection;

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();



var todoSchema = mongoose.Schema({
    text : String
})

var todoModel = mongoose.model('todo' , todoSchema);

app.set("view engine",'ejs');

app.use("/static",express.static("./static"));


var data;
app.get("/",function(req,response){
    var showQuery = todoModel.find({});
    showQuery.exec(function(req,res){
        data = res;
    });
    response.render("view1" , {sentItem : data});
})


app.post("/add", urlencodedParser , function(req,response){
   
    var queryADD = new todoModel({
        text : req.body.inputtext
    }) 
    queryADD.save(function(err,res){
        console.log("new Query is fired successfully")
    })
    response.redirect('/');
    
})
var querydelete;
app.get("/delete/:id",function(req,response){
    console.log(req.params.id);
    querydelete = todoModel.findByIdAndDelete(req.params.id);
    querydelete.exec(function(err,res){
        console.log("successfully deleted");
    })
    response.redirect("/");
})

app.listen(4000,() => console.log("you are listening on port 4000"));