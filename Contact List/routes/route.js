const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.model');

//retriving data
router.get('/contacts',(req,res,next)=>{
    Contact.find((err,contact)=>{
        res.json(contact);
    });
});


//add 
router.post('/contacts',function(req,res){
    console.log(req.body);
    let newContact = new Contact({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        phone:req.body.phone
    });
    newContact.save((err,contact)=>{
        if(err){
            res.json({msg:"failed to add contact"});
        }else{
            res.json({msg:"contact added successfully"});
        }
    });
});


//deleting contact
router.delete('/contacts/:id',(req,res,next)=>{
    Contact.remove({_id:req.params.id},(err,result)=>{
        if(err){
            res.json(err);
        }else{
            console.log("deleted Successfully");
            res.json(result);
        }
    });
});
module.exports = router;