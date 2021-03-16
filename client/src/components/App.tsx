import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";
import SurveyListItemEdit from "./surveys/SurveyListItemEdit";

const App = (props:any):any => {
	/*componentDidMount() {
		this.props.fetchUser();
	}*/

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
					<Route path="/surveys/new" component={SurveyNew} />
					<Route path="/edit_survey/:surveyId" component={SurveyListItemEdit} />
				</div>
			</BrowserRouter>
		</div>
	);
};

export default connect(null, actions)(App);
