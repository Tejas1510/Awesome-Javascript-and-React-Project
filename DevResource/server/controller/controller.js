import DevSchema from '../models/resource.js'
import mongoose from 'mongoose';
export const getData = async (req,res) => {
    try{
        const resourceData = await DevSchema.find()
        res.status(200).json(resourceData)
    }
    catch(error){
        res.status(404).json({message:error.message})
    }
}

export const createResource = async (req,res) => {

    console.log(req.body)
    const resource = req.body;

    const newResource = new DevSchema(resource)

    try{
        await newResource.save()
        res.status(201).json(newResource)
    }
    catch(error){
        res.status(409).json({message:error.message})
    }
}

export const deleteResource = async (req,res) =>{

    try{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await DevSchema.findByIdAndRemove(id)
    
    res.json({message:'Post deleted Succesfully'})
    }
    catch(error){
        res.status(404).json({message:error.message})
    }
}

export const updateResource = async (req,res) =>{
    try{
        const{id} = req.params
        console.log(id)
        const resource = req.body
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        const updatedresource = await DevSchema.findByIdAndUpdate(id,resource,{new:true})
        console.log("The final res is",updatedresource.title)
        res.json(updatedresource)

    }
    catch(error){
        res.send({message:error.message})
    }
}