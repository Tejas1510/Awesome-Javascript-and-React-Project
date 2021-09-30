import mongoose from 'mongoose'

const devSchema = mongoose.Schema({
    id:String,
    title:{
        type:String,
        // required: true
    },
    description:{
        type:String,
        // required: true
    },
    link:{
        type:String,
        // required: true
    },
    selectedFile:{
        type:String,
        // required: true
    },
})

const DevSchema = mongoose.model('DevSchema',devSchema)

export default DevSchema;