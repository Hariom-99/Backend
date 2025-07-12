const express=require("express");
const app=express();
const port=8080;

app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.send('Welcome! Use /submit to send form data.');
});


app.get('/submit', (req, res) => {
  const { name, password } = req.query; 
  console.log('Name:', name);
  console.log('Password:', password);
  res.send('Form submitted using GET!');
});

app.post('/submit',(req,res)=>{
    const{name,password}=req.body;
    console.log('Name:',name);
    console.log('Password:',password);
    res.send(`Form is submitted by ${name}`);
});


app.listen(port,()=>{
    console.log(`This server is running on port ${port}`);
})