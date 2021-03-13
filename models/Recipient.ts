const mongoose=require('mongoose');
const {Schema}=mongoose;

interface recipientSchemaInterface{
    email:string,
    responded?:boolean
}

export const recipientSchema=new Schema({
    email: String,
    responded:{type:Boolean, default:false}
});
