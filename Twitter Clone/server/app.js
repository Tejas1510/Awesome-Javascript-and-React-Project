const express=require('express'),
    cors     =require('cors'),
    monk     =require('monk');
const rateLimit = require('express-rate-limit');
    filter   =require('bad-words')    

const  app= express();
app.use(cors());
app.use(express.json()); //Body parser

const db=monk(process.env.MONGO_URI||'localhost/woofer');
const woofs=db.get('woofs');
      filter=new filter();

   





//--------------------Routes--------------------------------
app.get("/",(req,res)=>{
    res.json({
        message:"Woof Woof! woof"
    })
})

const isValidWoof=(woof)=>{
    return woof.name && woof.name.toString().trim() !==""

}

app.use(rateLimit({
    windowMs:60*1000,
    max:100
}));
app.post("/woofs",(req,res)=>{
    

    if(isValidWoof(req.body)){
        //db insertion
        const woof={
            name:filter.clean(req.body.name.toString()),
            content:filter.clean(req.body.content.toString()),
            created_date: new Date()
        }

        woofs
            .insert(woof)
            .then(createdWooof=>{
                res.send(createdWooof)
            });

        res.redirect('/woofs');
        
    }
    else{
        res.status(422);
        res.json({
            message:"you need to fill out name AND content bro"
        })
        
    }
})

app.get("/woofs",(req,res)=>{
    woofs
        .find()
        .then(woofs=>res.json(woofs))
})


//-------------------------Listener-------------------------
app.listen(3000,process.env.IP,()=>{
    console.log("Woofer listening on PORT:3000")
})