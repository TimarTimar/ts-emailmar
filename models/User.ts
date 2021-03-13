import mongoose from 'mongoose';

const {Schema}=mongoose;

export interface userSchemaInterface{
    _id?:number,
    googleId:string,
    credits:number
}

const userSchema=new Schema({
    googleId: String,
    credits: {type:Number, default:0}
});

mongoose.model('users', userSchema);