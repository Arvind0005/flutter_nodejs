const http = require('http');

const hostname = 'localhost';

const port = 3000;

const server = http.createServer(function(req,res)
{
    res.write("a response");
    console.log("a responce sent");
    res.end();
});

server.listen(port,function()
{
    console.log(`server connected to port ${port}`);
})