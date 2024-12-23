import mongoose from 'mongoose'
const connectDB = async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log("DB connected")
    })
    await mongoose.connect(`${process.env.mongodb_url}/ecommerce`)
}

export default connectDB