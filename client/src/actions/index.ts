import axios from "axios";
import { Dispatch } from "redux";
import { Survey } from "../reducers/types";
import { FETCH_USER, FETCH_SURVEYS, FETCH_SURVEY } from "./types";

export const fetchUser = () => async (dispatch:Dispatch) => {
	const res = await axios.get("/api/current_user");

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token:any) => async (dispatch:Dispatch) => {
	const res = await axios.post("/api/stripe", token);

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values:Survey, history:any) => async (dispatch:Dispatch) => {
	const res = await axios.post("/api/surveys", values);

	history.push("/surveys");

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async (dispatch:Dispatch) => {
	const res = await axios.get("/api/surveys");

	dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchSurvey = (surveyId:string) => async (dispatch:Dispatch) => {
	const res = await axios.get(`/api/fetch_survey/${surveyId}`);

	dispatch({ type: FETCH_SURVEY, payload: res.data });
};
