require('dotenv').config();

const express = require("express");
const app=express();
const PORT=process.env.PORT | 3000;
const cookieParser=require('cookie-parser');
const bodyParser = require('body-parser');
const {sessionConnection} = require('./configure/sessionConnection');

const authRoute = require("./routes/authRoute");

const {errorController} =require("./controllers/errorController");
const cors = require('./configure/corsSetup');

//Handling CORS(Remove it while using postman)
app.use(cors);

//cookie parser(fill up req(Request) object with all the browser cookies)
app.use(cookieParser());

// parse url query string
app.use(bodyParser.urlencoded({ extended: false }));

// parse data into json for sending as response
app.use(bodyParser.json());

//session middleware
app.use(sessionConnection);

app.get('/',(req,res)=>{
    if(req.session.e_id)
        res.json(req.session.e_id);
    else
        res.json("NO LOGIN");
});

app.use('/auth', authRoute);

app.use(errorController);

app.use('*',(_,res)=>{
    res.json({
        message:"No routes matched."
    })
})

app.listen(PORT,()=>{
    console.log(`Server started.${PORT}`);
})