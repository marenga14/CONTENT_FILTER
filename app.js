const { readFileSync } = require('fs');
const http = require('http');
const https = require('https');
const fs = require('fs')
const lib = require("./lib/operation")
lib.delete ('data','newFile', function(err){
  if(!err){
      console.log("done")
  }
  else{
    console.log(err)
  }
})
 
const { StringDecoder } = require('string_decoder');
const url =require ('url')
let config= require ('./config')


//instatiating the https server 
const httpsServerOptions = {
   "certificate": fs.readFileSync('./https/cert.pem'),
   "key" :fs.readFileSync('./https/key.pem')
}
const httpsServer = https.createServer(httpsServerOptions,function(req,res){

  servers(req,res)
})

    //req url contains all the user request that is sent to us, true....is used to call the query string that contains the url datas (all metadata about the reuest coming in)
 const servers = function ( req,res){
    const parseUrl =url.parse (req.url,true);
     const path = parseUrl.pathname;
     const trimedPath =path.replace("k",'');


     //getting the method from the request body
     const method = req.method.toLowerCase();

     //getting strings
    const queryStrings = parseUrl.query
    //passing request headers 
    const headers = req.headers;

    //decoding the request
    var decoder = new StringDecoder('utf-8')
    var buffer ="";
     req.on('data', function(data){
       buffer += decoder.write(data) 
     })
  req.on('end', function(){
    buffer += decoder.end() 


    let chosenHandle = typeof(route[trimedPath]) !=="undefined"? route[trimedPath]: handle.notFound
 

    const data = {
      "trimedPath": trimedPath,
      "queryString": queryStrings,
      "method":method,
      "headers": headers,
      "payload": buffer
    }


     //getting the handle from the request 

chosenHandle(data,function(statusCode,payload){
  statusCode = typeof(statusCode)=="number"? statusCode: 200;
  payload = typeof(payload) =="object"? payload : {};

  var payloadString = JSON.stringify(payload);
  fs.writeFile("./files.docx",payloadString,err=>{
    if(err){
      console.log(err)
    }
  });
  res.setHeader("Content-Type","application/json")
  res.writeHead(statusCode);
  res.end(payloadString)
}) 
  })
  }

  const httpServer= http.createServer(function(req,res){
    servers(req,res)
  })

  
  //get the path

//creating handles
const handle ={};
    handle.ping = function(data,callback){
       callback(200)

       }

    

    //not found handler

    handle.notFound = function(data,callback){
      callback(404);
    }

  //listen on the port
   httpServer.listen(config.httpPort,()=>{
    console.log('server is listening on port ' + config.httpPort + " in " + config.envName + " mode")
    console.log(config)
   })

   //listen of the https server
   httpsServer.listen(config.httpsPort,()=>{
    console.log('server is listening on port ' + config.httpsPort + " in " + config.envName + " mode")
    console.log(config)
   })

   //defining the router
   const route = {
    "ping" :handle.ping
  }