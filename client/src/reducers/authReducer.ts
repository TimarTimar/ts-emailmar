import { FetchUserAction, FETCH_USER } from "../actions/types";
import {  AuthState } from "./types";



export default function authReducer(state: AuthState | null = null, action:FetchUserAction) {
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;
		default:
			return state;
	}
}
