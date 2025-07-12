const express=require("express")
const app=express();
const port=3000;

app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("home.ejs");
})

app.get("/ig/:username",(req,res)=>{
    let {username}=req.params;
    const instadata=require("./data.json");
    const data=instadata[username];
    res.render("ig.ejs",{data});
})

 app.listen(port,()=>{
    console.log(`This port is listening ${ port }`);
 });