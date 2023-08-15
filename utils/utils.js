const fs=require("node:fs")


//this appends the contents of file
function writeDataToFile(filename,content){
    fs.writeFileSync(filename,JSON.stringify(content),'utf-8',(err)=>{
        if(err){
            console.log(err)
        }
    })
}



//this gets the body data coming from the user in json format
function getPostData(req){
    return new Promise((resolve,reject)=>{
        try {
            
            let body='';

            //req is a streamable 
            req.on('data',(chunk)=>{
            body+=chunk.toString('utf-8');

            req.on('end',()=>{
                resolve(body)
            })
        })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports={
    writeDataToFile,
    getPostData
}