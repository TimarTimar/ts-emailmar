import { FetchUserAction, FETCH_USER } from "../actions/types";
import {  AuthState } from "./types";

const initialState:AuthState | null = null

export default function authReducer(state=initialState, action:FetchUserAction) {
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;
		default:
			return state;
	}
}
