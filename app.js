const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/feedbackDB",{useNewUrlParser:true});

const feedbacksSchema={
    firstname : String,
    lastname : String,
    email : String,
    mobile :Number,
    suggestion : String
}

const Feedback = mongoose.model("Feedback",feedbacksSchema);


app.get("/",function(req,res){
    res.render("home");
});

app.get("/contact",function(req,res){
    res.render("contact");
});

app.post("/contact",function(req,res){

    const FIRSTNAME = req.body.FirstName;
    const LASTNAME = req.body.LastName;
    const EMAIL = req.body.Email;
    const NUMBER = req.body.MobileNumber;
    const SUGGESTION = req.body.Suggestion;

    const FeedBack = new Feedback({
        firstname:FIRSTNAME,
        lastname:LASTNAME,
        email:EMAIL,
        mobile:NUMBER,
        suggestion:SUGGESTION
    });


    FeedBack.save();

    res.redirect("/");

});

app.get("/facultytimetable",function(req,res){
    res.render("faculty");
});

app.post("/facultytimetable",function(req,res){
    const app =req.body.faculty;
    res.render("faculty2");
});

app.get("/material",function(req,res){
    res.render("material");
});

app.get("/sem1",function(req,res){
    res.render("sem1");
});

app.get("/sem2",function(req,res){
    res.render("sem2");
});

app.get("/sem3",function(req,res){
    res.render("sem3");
});

app.listen(7000,function(){
    console.log("Server is running at 7000");
})