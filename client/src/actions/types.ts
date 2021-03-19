import { AuthState, SurveyState } from "../reducers/types";

export const FETCH_USER = "fetch_user";
export const FETCH_SURVEYS = "fetch_surveys";
export const FETCH_SURVEY = "fetch_survey";

//Auth action interface

export interface FetchUserAction{
    type: typeof FETCH_USER
    payload: AuthState
}

//Surveys actions types
//I fetch all surveys on the "/surveys page". There are deleting, saving as draft funcionalities implemented. I redirect the user to "/surveys" after those api calls.

interface FetchSurveysAction{
    type:typeof FETCH_SURVEYS
    payload?: SurveyState[]
}

interface FetchSurveyAction{
    type:typeof FETCH_SURVEY
    payload?: SurveyState
}

export type SurveysActionTypes= FetchSurveysAction | FetchSurveyAction
