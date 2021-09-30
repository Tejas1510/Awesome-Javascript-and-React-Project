import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import DevRoutes from './routes/routes.js'

const app =express()

app.use(express.json({limit:'30mb',extended:true}))
app.use(express.urlencoded());
app.use('/',DevRoutes)
app.use(cors())


const CONNECTION_URL = 'mongodb+srv://devresource:devresource@cluster0.17um4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 8000

mongoose.connect(CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => app.listen(PORT,() => console.log(`Server is running on port ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify',false)