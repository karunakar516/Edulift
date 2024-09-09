import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
        userName:{
            type: String,
            required : true,
            unique:true
        },
        password: {
            type: String,
            required : true
        },
        accountType : {
            type : String ,
            enum : [ 'student' , 'tutor' , 'helper' ],
            required : true
        },
        email: {
            type : String,
            required : true,
        },
        subscribedContent : [{
            type : Schema.Types.ObjectId,
            ref : 'Content',
            required : false
        }]
    }
)
userSchema.pre("save", async function ( next ){
    const user = this;
    if ( ! this.isModified('password')) return next();
    try {
        const encrypted = await bcrypt.hash(user.password,parseInt(process.env.SALT_ROUNDS));
        user.password = encrypted;
        next();
    }
    catch(err){
        return next(err);
    }
});

userSchema.methods.checkPassword = async function(password){
    try{
        let acceptedPassword = bcrypt.compare(password,this.password);
        return acceptedPassword;
    }
    catch(err){
        throw err;
    }
}
const user = mongoose.model('User',userSchema);
export default user;