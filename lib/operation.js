const fs = require("fs");
const path = require("path");
 const lib={};
 lib.filePath = path.join(__dirname,"/../https/");

lib.create = function(dir,file,data,callback)
{
    fs.open( lib.filePath + dir +"/"+ file +".docx","wx",function(err,fileDescriptor){
        if(!err && fileDescriptor){
            var stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor,stringData,function(err){
                if(!err){
                    fs.close(fileDescriptor,function(err){
                        if(!err){
                           callback("file closed with the error: "+ err)
                        }
                        else{
                               callback("error in closing the file " + fileDescriptor +" "+ err)
                        }
                    })

                }else{
                    callback("error in writing the file")
                }
            }
            )

        }
        else{
                   callback("failed to open the file")
        }

    });
    
}



lib.update= function(dir,file,data,callback){
    fs.open(lib.filePath + dir + "/"+ file+".docx","r+",function(err,fileDescriptor){
        if(!err && fileDescriptor){
            var stringdata = JSON.stringify(data);
            fs.truncate(fileDescriptor,function(err){

                if(!err){
                fs.writeFile(fileDescriptor,stringdata,function(err){
                    if(!err){
                        fs.close(fileDescriptor,function(err){
                            if(!err){
                        callback("file was updated ")
                                
                            }
                            else{
                                callback("didnt close correctly")
                            }
                        })
                    }
                    else{
                        callback("not read with the error or the file doesnt exist " )
                    }
                })
    
            }else{
                callback("failed to truncate the files")
            }
            })
           
        }
        else{
            callback("failed to open the file")
        }

    })

}

lib.read= function (dir,file,callback){
   
    fs.readFile(lib.filePath + dir +"/"+file+".pdf",'utf8',function(err,data){
        if(!err){
         
            callback(data)
        }
        else{
            callback(err)
        }
    })

}

lib.delete= function(dir,file,callback){
    fs.unlink(lib.filePath + dir + "/"+ file+".docx",function(err){
        if(!err){
            callback("deleted")
        }
        else{
            callback("not deleted ")
        }
    })
}
 module.exports = lib;