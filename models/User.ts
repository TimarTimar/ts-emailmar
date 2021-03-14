import mongoose, {Schema, Document} from 'mongoose';

export interface userSchemaInterface extends Document{
    _id?:number,
    googleId:string,
    credits:number
}

const userSchema=new Schema({
    googleId: String,
    credits: {type:Number, default:0}
});

export default mongoose.model<userSchemaInterface>('users', userSchema);