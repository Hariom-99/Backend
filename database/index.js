const mysql=require("mysql2");





const connection=mysql.createConnection({         // to connect the database 
    host:"localhost",
    user:"root",
    database:"instagram",
    password:"Mysql@4688",
});

let q="show tables";



    connection.query(q,(err,result)=>{   //getting table list 
        if (err) {
        console.error("Error in SHOW TABLES query:", err);
        connection.end();  // Close connection even if error
        return;
    };
        console.log(result);
        console.log(result.length);
    
    

    let firsttable=Object.values(result[1])[0];  //table content printing 
    let p=`select * from ${firsttable}`;
    connection.query(p,(err,paste)=>{
        if(err) {
        console.error("Error in SHOW TABLES query:", err);
        connection.end();  // Close connection even if error
        return;
    };
        console.log(paste);
    });
    connection.end();

    });
