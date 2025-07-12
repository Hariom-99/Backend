const express=require("express");
const app=express();
const path=require("path");
 const port=8080;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
 app.get("/",(req,res)=>{
    //res.send("This is the home page");
    res.render("home.ejs");
 });

 app.get("/roll",(req,res)=>{
    const random_num= Math.floor(Math.random() * 6) + 1;
    res.render("roll_dice.ejs",{num:random_num});
 });




 app.listen(port,()=>{
    console.log(`This port is listening ${ port }`);
 });