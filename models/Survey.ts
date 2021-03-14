import {createSchema, ExtractDoc, ExtractProps, Type, typedModel} from 'ts-mongoose';
import {recipientSchema} from './Recipient';
import {User, userSchema} from '../models/User';

//_user: { type: Schema.Types.ObjectId, ref: "User" },

export const surveySchema = createSchema({
	title: Type.string(),
	body: Type.string(),
	subject: Type.string(),
	recipients: Type.array({required:true}).of(recipientSchema),
	yes: Type.number({default:0}),
	no: Type.number({default:0}),
	_user: Type.ref(Type.objectId()).to('User', userSchema), 
	state: Type.string({default:"draft"}),
	dateSent: Type.date({default:null}),
	lastResponded: Type.date(),
});

//export default mongoose.model<surveySchemaInterface>("surveys", surveySchema);

export const Survey=typedModel('surveys', surveySchema);
export type SurveyDoc=ExtractDoc<typeof surveySchema>;
export type SurveyProps=ExtractProps<typeof surveySchema>;