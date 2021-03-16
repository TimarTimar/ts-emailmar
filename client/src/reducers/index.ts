import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export const rootReducer = combineReducers({
    auth:authReducer,
    form:formReducer,
    surveys:surveysReducer
});

export type RootState=ReturnType<typeof rootReducer>