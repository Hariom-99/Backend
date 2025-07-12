const express=require("express");
const app= express();
const port=8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("Server is ready to serve");
});

let posts=[
    {   id:uuidv4(), 
        username:"hariom",
        comment:"life is amazing",
    },
    {   id:uuidv4(),
        username:"sandra",
        comment:"habibi come to kerala",
    },
    {   id:uuidv4(),
        username:"harsh",
        comment:"jai shree ram ",
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("newindex.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,comment}=req.body;
    let id=uuidv4();
    posts.push({id,username,comment});
    res.redirect("/posts")
    res.send("req is received bt post ");

})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});

});

app.listen(port,()=>{
    console.log("listenint to port : 8080");
});
