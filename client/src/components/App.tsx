import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import { FormikSurveyForm } from "./surveys/formikForm/FormikSurveyForm";
import { FormikSurveyNew } from "./surveys/formikForm/FormikSurveyNew";
import { FormikSurveyListItemEdit } from "./surveys/formikForm/FormikSurveyListItemEdit";

/*
import { Dispatch } from "redux";
interface AppProps{
	fetchUser: () => (dispatch: Dispatch) => Promise<void>
}
*/

const App: React.FC<any> = (props) => {
	useEffect(() => {
		props.fetchUser();
	}, []);

	return (
		<div className="container">
			<BrowserRouter>
				<div className="container">
					<Header />
					<Route path="/" exact component={Landing} />
					<Route path="/surveys" exact component={Dashboard} />
					<Route path="/surveys/new" component={FormikSurveyNew} />
					<Route
						path="/edit_survey/:surveyId"
						component={FormikSurveyListItemEdit}
					/>
					<Route path="/surveys/formik" component={FormikSurveyForm} />
				</div>
			</BrowserRouter>
		</div>
	);
};

export default connect(null, actions)(App);
