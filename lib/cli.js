const readline = require("readline")
const events = require("events")
class _events extends events{};
const e = new _events();
const util = require("util")
const debug = util.debuglog("cli");


//initialize the cli 
const cli ={}


//handling the events
 e.on("help",(str)=>{
    cli.respond.help()
 })

 e.on("man", (str)=>{
    cli.respond.help()
 })
 e.on("exit", (str)=>{
    cli.respond.exit()
 })


 //adding the responses
 cli.respond = {}
 cli.respond.help = ()=>{
    console.log("you gotta need some help from God always ")
 }

 cli.respond.exit = ()=>{
     process.exit(0);
 }

    cli.processInput = function(str){
         str = typeof(str) =="string" && str.trim().length>0?str.trim() :false;
       
        if(str){
            matchFound=false;
            //codify to it's unique values
            const unique =["man","help","exit"];
            unique.forEach(input=>{
                if(str.toLowerCase().indexOf(input) >-1){
                    matchFound =true;
                    //emmit the event
                    e.emit(input,str)
                    return true
                }
            });
            if(!matchFound){
                console.log("try again");
}
    }    
    }

    //initialize
    cli.init= function (){
        console.log("cli is running")
    const _interface = readline.createInterface({
        input:process.stdin,
        output:process.stdout,
        prompt:">>  "
    })

    //initialize the prompt

    _interface.prompt()
//read the input line by line
    _interface.on("line", function(str){
        cli.processInput(str);

        //reinitialize the prompt
        _interface.prompt()
    });
    //if the user closes the prompt 
    _interface.on("close",function(){
        process.exit(0);
    })
}



module.exports= cli;