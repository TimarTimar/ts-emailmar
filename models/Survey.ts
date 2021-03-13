import mongoose from 'mongoose';

import {recipientSchema} from './Recipient';

const { Schema } = mongoose;

export interface surveySchemaInterface{
	_id?:number,
	title: string,
	body: string,
	subject: string,
	recipients: any,
	yes: number,
	no: number,
	_user: any,
	state: string,
	dateSent: any,
	lastResponded: Date,
}

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [recipientSchema],
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	_user: { type: Schema.Types.ObjectId, ref: "User" },
	state: { type: String, default: "draft" },
	dateSent: { type: Date, default: null },
	lastResponded: Date,
});

mongoose.model("surveys", surveySchema);
