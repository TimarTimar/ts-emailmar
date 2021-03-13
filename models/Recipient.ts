const mongoose=require('mongoose');
const {Schema}=mongoose;

export interface recipientSchemaInterface{
    email:string,
    responded?:boolean
}

export const recipientSchema=new Schema({
    email: String,
    responded:{type:Boolean, default:false}
});
