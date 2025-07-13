const mysql=require("mysql2");
const { faker } = require('@faker-js/faker');
const express=require("express");
const app=express();
let port=8080;
const path=require("path");
const methodOverride=require("method-override");
const { constants } = require("buffer");
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));

const connection=mysql.createConnection({         // to connect the database 
    host:"localhost",
    user:"root",
    database:"instagram",
    password:"Mysql@4688",
});


app.set("views engine","ejs");                      // this is to set template in home page and other pages
app.set("views",path.join(__dirname,"/views"));



// let create_tq="create table profile( id int,username varchar(200),email varchar(200));"

// connection.query(create_tq,(err,result)=>{
//     if(err){
//         console.log("The error occured in the creation of the table ");
//     }
//     else{
//         console.log("created succesfully");
//     }
//     connection.end();
// });




// let q="show tables";

 let insertquery="insert into user (id,age,name,email,followers,following) values ?";

// let new_user=[
//     [1999,16,"krishna garg","kg@gmail.com",123,12],
//     [10001,112,"Dhruv","grd@gmail.com",155,156]
// ];

// connection.query(insertquery,[new_user],(err,result)=>{
//     if(err){
//         console.log("The error occured in the insetion of the data",err.message);
//         connection.end();
//         return;
//     }
//     console.log("The insertion was successful thankyou!");
//     connection.end();
    
// });



// ----insert in bulk


// function createRandomUser() {
//   return [
//     faker.string.uuid(),
//      faker.internet.username(), // before version 9.1.0, use userName()
//      faker.internet.email(),
//   ];
// }

// let data=[];
// for( i=0;i<100;i++){
//     data.push(createRandomUser());
//     }

// let insertqueryprofil="insert into profile (id,username,email) values ?";
// connection.query(insertqueryprofil,[data],(err,result)=>{
//     if(err){
//         console.log("error occured in the bulk insert",err.message);

//     }
//     else{
//         console.log("inertion in bulk was successful");
//     }
//     connection.end();
// });






    // connection.query(q,(err,result)=>{   //getting table list 
    //     if (err) {
    //     console.error("Error in SHOW TABLES query:", err);
    //     connection.end();  // Close connection even if error
    //     return;
    // };
    //     console.log(result);
    //     console.log(result.length);
    
    

    // let firsttable=Object.values(result[1])[0];  //table content printing 
    // let p=`select * from ${firsttable}`;
    // connection.query(p,(err,paste)=>{
    //     if(err) {
    //     console.error("Error in SHOW TABLES query:", err);
    //     connection.end();  // Close connection even if error
    //     return;
    // };
    //     console.log(paste);
    // });
    // connection.end();

    // });



    app.get("/",(req,res)=>{                      // this is the home page route 
        //res.send("welcome to home page");
        let qry='select count(*) from profile';
        try{
            connection.query(qry,(err,result)=>{
                if(err) throw err;
                let count=result[0]["count(*)"];
                res.render("home.ejs",{count});
            });
        }
        catch(err){
            res.send("some error occured");
        }
    });

    app.get("/allusers",(req,res)=>{
        let qry='select * from profile';
        try{
            connection.query(qry,(err,result)=>{
                if(err) throw err;
                let users=result;
                res.render("allprofiles.ejs",{users});
            });
        }
        catch(err){
            res.send("some error occured");
        }
    })
    app.get("/user/:id/edit",(req,res)=>{
        let usrparam=req.params;
        let editq=`select * from profile where id='${usrparam.id}'`;
        try{
            connection.query(editq,(err,result)=>{
                if(err) throw err;
                let user=result[0];
                res.render("edit.ejs",{ user });
                console.log(user);
            });
        }
        catch(err){
            res.send("some error occured in the edit section");
        }
    })


    //UPDATE  DATABASE ROUTE 
    app.patch("/edit/:id",(req,res)=>{
        let {id}=req.params;
        let {password: formpass,username:formusername}=req.body;
        let q=`select * from profile where id='${id}'`;
        try{
            connection.query(q,(err,result)=>{
                if(err) throw err;
                let user=result[0];
                if(formpass!==user.email){
                    res.send("Wrong password");
                }
                else{
                    let updateq=`update profile set username='${formusername}' where id='${id}'`;
                    connection.query(updateq,(err,result)=>{
                        if(err) throw err;
                        res.redirect("/allusers")
                    });
                }
                //res.send(user)
        });
        }
        catch(err){
            console.log(err);
            res.send("An error occured in the change ");
        }
    });

    app.listen(port,()=>{                               // this is command to start the engine server
        console.log("Server is litening to port 8080");
    })