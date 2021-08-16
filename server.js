const http = require('http');
const express = require('express');
const hostname = 'localhost';
const dburi = 'mongodb+srv://Arvind:password05@cluster0.rayzm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const mongoose = require('mongoose');
const port = 3000;
const User = require('./lib/models/authdata_schema');
const cors = require('cors');
const app =express();
const bodyParser = require('body-parser');
const { Console } = require('console');
const { json } = require('body-parser');
app.use(cors());
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
    console.log("yessss");
    User.find().then(function(data)
    {
        res.send(data);
    }).catch(function(err)
    {
        console.log(err);
    })
});

app.post('/login',function(req,res)
{
    // if(req.body.name=null || req.body.password==null)
    // {
    //     console.log("check2");
    //     res.json({'success':'failed','msg':'please specify all the data'});
    //     res.end();
    // }
    User.findOne({name:req.body.name},function(err,user)
    {
        console.log('yyyyyyyyyyy');
        console.log(user);
        if(err)
        {
            throw err;
        }
        else if(user==null)
        {
            res.json({'sucess':'failed','msg':'user not found please try creating one'});
            res.end();
        }
        else if(req.body.password != user.password)
        {
            res.json({'sucess':'failed','msg':'passwords did not match'});
            res.end();
        }
        else if(req.body.password ==user.password)
        {
            res.json({'sucess':'true','msg':'user authenticated'});
        }
    });
//     console.log("check1");
//     console.log("xxxxxxxxxxxxxxxxxx");
//    // console.log(user1);
//     console.log(req.body.name);
    // if(req.body.name=null || req.body.password==null)
    // {
    //     console.log("check2");
    //     res.json({'success':'failed','msg':'please specify all the data'});
    //     res.end();
    // }
    // if(req.body.name==User.findOne({name:req.body.name}).name,function(err)
    // {
    //     console.log("check3");
    //     if(err)
    //     {
    //         res.json({'sucess':'failed','msg':'User not found try creating the user'});
    //     }
    //     else
    //     {
    //       const user0 = User.findOne({name:req.body.name});
    //         if(user0.password==req.body.password)
    //         {
    //             res.json({'sucess':'true','msg':'user logged in'});
    //         }
    //         else
    //         {
    //             res.json({'success':'failed','msg':'password did not match'});
    //         }
    //     }
    // });
})

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
            res.send(result);``
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