import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "../components/Header";
import Landing from "../components/Landing";
import Dashboard from "../components/Dashboard";
import SurveyNew from "../components/surveys/SurveyNew";
import SurveyListItemEdit from "../components/surveys/SurveyListItemEdit";

class App extends React.Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="container">
				<BrowserRouter>
					<div className="container">
						<Header />
						<Route path="/" exact component={Landing} />
						<Route path="/surveys" exact component={Dashboard} />
						<Route path="/surveys/new" component={SurveyNew} />
						<Route
							path="/edit_survey/:surveyId"
							component={SurveyListItemEdit}
						/>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);
