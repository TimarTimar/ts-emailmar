export interface FormikSurveyFormValues {
	title: string;
	subject: string;
	body: string;
	recipients: string;
}

export interface FetchSurveyResponseData {
	data: {
		body: string;
		dateSent: any;
		no: number;
		recipients: { responded: boolean; _id: string; email: string }[];
		state: "draft" | "sent";
		subject: string;
		title: string;
		yes: number;
		_id: string;
		_user: string;
	};
}
