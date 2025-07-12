const express=require("express");
const app=express();

let port=3000;
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
});
// app.use((req,res)=>{
//     console.log("request received");
//     //res.send("this is server respone by hariom")
//     let json_res={
//         volvo:"bus",
//         mercedes:"car",
//     };
//     //let furfurinagar="<h1>Welcome<h1/><ul><li>chota don<li/><li>motu<li/><ul/>";
//     res.send(json_res);
// });
app.get("/",(req,res)=>{
    res.send("hello, i am groot");
});
app.get("/:username/:id", (req,res)=>{
    let {username, id}=req.params;
    let htmlStr=`<h1>Welcome to the page of @${username}</h1>`;
    res.send(htmlStr);
});