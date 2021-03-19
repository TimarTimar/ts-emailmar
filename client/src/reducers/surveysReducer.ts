import { FETCH_SURVEY, FETCH_SURVEYS } from "../actions/types";

const surveysReducer = (state:any = [], action:any) => {
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
