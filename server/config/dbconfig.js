import mongoose from "mongoose";
const  dbConfig=async ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        console.log('db connected!')
    })
}
export default dbConfig