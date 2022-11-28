// initialization
const ser = require("express");
const app = ser();

const mongoose = require("mongoose");
const Note = require("./models/Note");

const bodyParser= require("body-parser");
const { deleteOne } = require("./models/Note");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://himanshu:himanshu@cluster0.kdyv2ub.mongodb.net/?retryWrites=true&w=majority").then(function () {

    //app routes
    app.get("/", function (req, res) {
        const response={st_code:res.statusCode, message:"API works!!"};
        res.json(response); 
    });

    app.post("/notes/list", async function (req, res) {
        const notes = await Note.find({userid:req.body.userid});
        res.json(notes);
    });


    app.post("/notes/add", async function (req, res) {
        const newnote = new Note({
            id: req.body.id,
            userid: req.body.userid,
            title: req.body.title,
            content:req.body.content,
        });
        await newnote.save();

        const response = { message: "New Note Created "+`id: ${req.body.id}`};
        res.json(response);
    });
    app.post("/notes/delete", async function(req,res){
        await Note.deleteOne({id: req.body.id});
        var response={message:"node deleted of id:"+`${req.body.id}`};
        res.json(response); 
    });
   
});

var PORT= process.env.PORT || 3000;
//starting a server on a port
app.listen(PORT, function () {
    console.log("server started at local host: "+`${PORT}`);
});