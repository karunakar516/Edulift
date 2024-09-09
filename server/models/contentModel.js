import mongoose, { Schema } from "mongoose";

const contentSchema = mongoose.Schema(
    {
        title : {
            type : String,
            required : true
        },
        author : {
            type : Schema.Types.ObjectId,
            ref : 'User',
        },
        price : {
            type : Number ,
            required : true,
        },
        aboutContent : {
            type : String,
            required : true,
        },
        videoURL :{
            type : String,
            required : true,
        }
    }
)
const content = mongoose.model('Content' , contentSchema);
export default content;