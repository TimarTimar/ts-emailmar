import { FETCH_USER } from "../actions/types";

export interface authStateInterface{
	credits:number,
	_id:string,
	googleId:string,
}

export interface authActionsInteface{
	type:string,
	payload:authStateInterface
}

export default function authReducer(state: any = null, action:authActionsInteface) {
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;
		default:
			return state;
	}
}
