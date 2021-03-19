import { FETCH_SURVEY, FETCH_SURVEYS, SurveysActionTypes } from "../actions/types";
import { SurveyState } from "./types";

const initialState:SurveyState[]=[]

const surveysReducer = (state=initialState, action:SurveysActionTypes) => {
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
