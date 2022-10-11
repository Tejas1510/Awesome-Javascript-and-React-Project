const {Schema,model} = require('mongoose')

const planetSchema = new Schema({
    keplerName:{
        type:String,
        required:true
    }
})

module.exports = model('Planet',planetSchema)