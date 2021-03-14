import {createSchema, Type} from 'ts-mongoose';

export const recipientSchema=createSchema({
    email: Type.string({required:true}),
    responded: Type.boolean({default:false})
});
