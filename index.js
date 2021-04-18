const fs  = require('fs');
const http = require('http');
const axios = require('axios');
const {access,constants, mkdir} = require('fs');


const PORT = 4040;
const HOST = 'localhost';




const server = http.createServer((req,res)=>{

    res.statusCode=200;

    access("result",constants.F_OK,(err)=>{

        if(err){
            mkdir("result",(err)=>{
                if(err){
                    console.log("Couldn't create directory");
                }else{
                    console.log("Directory create successfully");
                }
            })
        }else{
            console.log("Directory Exist")
        }

    });

    axios.get('http://jsonplaceholder.typicode.com/posts')
     .then(function (response) {
    // handle success
        fs.writeFile("result/post.json",JSON.stringify(response.data,null,2),(err)=>{
                if(err){
                    console.log("Something went wrong");
                }else{
                    console.log("File written successfully")
                }

            });
       

        fs.writeFile("result/post.txt",JSON.stringify(response.data,null,2),(err)=>{
            if(err){
                console.log("Something went wrong");
            }else{
                console.log("File written successfully")
            }

        });

    }).catch(function (error) {
            console.log(error);
    });


    res.end(`File Created successfully.`);
    
});


server.listen(PORT,HOST,(res)=>{
    console.log(`Server started at port ${PORT}.`);
});