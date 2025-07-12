const mysql=require("mysql2");





const connection=mysql.createConnection({         // to connect the database 
    host:"localhost",
    user:"root",
    database:"instagram",
    password:"Mysql@4688",
});

let q="show tables";

let insertquery="insert into user (id,age,name,email,followers,following) values ?";

let new_user=[
    [1999,16,"krishna garg","kg@gmail.com",123,12],
    [10001,112,"Dhruv","grd@gmail.com",155,156]
];

connection.query(insertquery,[new_user],(err,result)=>{
    if(err){
        console.log("The error occured in the insetion of the data",err.message);
        connection.end();
        return;
    }
    console.log("The insertion was successful thankyou!");
    connection.end();
    
});




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
