import mongoose, {Schema, Document} from 'mongoose';
import {recipientSchema, recipientSchemaInterface} from './Recipient';
import {userSchemaInterface} from './User';


export interface surveySchemaInterface extends Document{
	_id?:number,
	title?: string,
	body?: string,
	subject?: string,
	recipients?: recipientSchemaInterface[],
	yes?: number,
	no?: number,
	_user?: userSchemaInterface['_id'],
	state?: string,
	dateSent?: Date,
	lastResponded?: Date,
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

export default mongoose.model<surveySchemaInterface>("surveys", surveySchema);
