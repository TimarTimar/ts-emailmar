import { FETCH_SURVEY, FETCH_SURVEYS } from "../actions/types";

export interface surveyStateInterface{
	yes: number,
	no: 0,
  state: "draft" | "sent",
  dateSent?: string | Date | null,
  _id: string,
  title: string,
  subject: string,
  participiants?: string,
  body: string,
  _user: string,
  lastResponded:string | Date | null
}

interface surveyActionInterface{
	type:string,
	payload:surveyStateInterface
}

const surveysReducer = (state = [], action:surveyActionInterface) => {
	switch (action.type) {
		case FETCH_SURVEYS:
			return action.payload;
		case FETCH_SURVEY:
			const newState = [action.payload];
			return newState;
		default:
			return state;
	}
};

export default surveysReducer;
