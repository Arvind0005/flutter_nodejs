const http = require('http');
const express = require('express');
const hostname = 'localhost';
const dburi = 'mongodb+srv://Arvind:password05@cluster0.rayzm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const mongoose = require('mongoose');
const port = 3000;
const User = require('./lib/models/authdata_schema');
const app =express();

mongoose.connect(dburi,{useNewUrlParser:true,useUnifiedTopology:true}).then(function()
{
    console.log("connexted to db");
}).catch(function(err)
{
    console.log(err);
}).then
(
    app.listen(3000,hostname,function(err)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(`server listening at port ${port} server at ${hostname}`);
        }
    })
);
app.get('/',function(req,res)
{
    User.find().then(function(data)
    {
        res.send(data);
    }).catch(function(err)
    {
        console.log(err);
    })
});

app.get('/hello',function(req,res)
{
    res.send("hello how are you");
});

// app.listen(3000,hostname,function(err)
// {
//     if(err)
//     {
//         console.log(err);
//     }
//     else
//     {
//         console.log(`server listening at port ${port} server at ${hostname}`);
//     }
// });
// const server = http.createServer(function(req,res)
// {
//     res.write("a response");
//     console.log("a responce sent");
//     res.end();
// });

// server.listen(port,function()
// {
//     console.log(`server connected to port ${port}`);
// })