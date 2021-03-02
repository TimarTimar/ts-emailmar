import _ from "lodash";
import React from "react";
import { fetchSurvey } from "../../actions/index";
import SurveyForm from "./SurveyForm";
import { connect } from "react-redux";

class SurveyListItemEdit extends React.Component {
	componentDidMount() {
		const surveyId = this.props.match.params.surveyId;
		const survey = this.props.fetchSurvey(surveyId);
	}
	render() {
		return (
			<div>
				<SurveyForm
					handleSubmit={() => {
						console.log(this.props);
					}}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { surveys: state.surveys };
};

export default connect(mapStateToProps, { fetchSurvey })(SurveyListItemEdit);
