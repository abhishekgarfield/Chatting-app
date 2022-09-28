var express=require("express");
var app=express();
app.use(express.json());
var cors=require("cors");
const port=8000;
app.use(cors());

//Sign up 

app.post("/signup",async(req,res)=>{
    console.log("in signup")

    const user=req.body;
    
    try{
        
    }
    catch(err)
    {
        console.log(err);
    }
})

app.listen(port,()=>{console.log("App is running on 8000")})