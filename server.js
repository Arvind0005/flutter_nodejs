const http = require('http');
const express = require('express');
const hostname = 'localhost';
const dburi = 'mongodb+srv://Arvind:password05@cluster0.rayzm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const mongoose = require('mongoose');
const port = 3000;
const User = require('./lib/models/authdata_schema');
const app =express();
const bodyParser = require('body-parser');
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
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
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

app.post('/create',function(req,res)
{
    if(req.body.name==null || req.body.password==null)
    {
        res.json({'success':'failed','msg':'please enter all the fields'});
    }
    else
    {
        const user = User({
            name: req.body.name,
            password:req.body.password,
        })
        user.save().then(function(result)
        {
            res.send(result);
        }).catch(function(err)
        {
            console.log(err);
        }) 
    }
    // if(!req.body.username || !req.body.password)
    // {
    //     res.json({'sucess':'failed','msg':"please enter all the fields"});
    // }
    
      //  console.log(req.body.username);
//    const user = User({
//        name: 'Arvind',
//        password:'Password',
//    })
//    user.save().then(function(result)
//    {
//        res.send(result);
//    }).catch(function(err)
//    {
//        console.log(err);
//    })
    
    
})
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