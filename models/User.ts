import {createSchema, ExtractDoc, ExtractProps, Type, typedModel} from 'ts-mongoose';

export const userSchema=createSchema({
    googleId: Type.string(),
    credits: Type.number({default:0})
});

export const User=typedModel('users', userSchema);
export type userDoc=ExtractDoc<typeof userSchema>;
export type userProps=ExtractProps<typeof userSchema>;