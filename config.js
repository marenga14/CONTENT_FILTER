//creating the configuration of enviroment variables

const enviroment = {};

//stagi
enviroment.stagging ={
    "httpPort":4000,
    "httpsPort":4001,
    "envName":'stagging'

}

//production
enviroment.production={
    "httpPort":5000,
    "httpsPort":5001,
    "envName":"production"
}

//determine which enviroment has been selected

var currentEnviroment = typeof(process.env.NODE_ENV)=="string"? process.env.NODE_ENV.toLowerCase(): "";
  
var enviromentChosen = typeof(enviroment[currentEnviroment])=="object"? enviroment[currentEnviroment]:enviroment.stagging;
  
module.exports= enviromentChosen;