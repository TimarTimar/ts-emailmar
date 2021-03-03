import _ from "lodash";
import React from "react";
import { fetchSurvey } from "../../actions/index";
import SurveyForm from "./SurveyForm";
import { connect } from "react-redux";

class SurveyListItemEdit extends React.Component {
	state = { initaialValues: null };
	componentDidMount() {
		const run = async () => {
			await this.props.fetchSurvey(this.props.match.params.surveyId);
			const values = _.pick(this.props.surveys[0], [
				"title",
				"subject",
				"body",
			]);
			const email2 = _.get(this.props.surveys[0], ["recipients", 0, "email"]);
			const obj = { ...values, recipients: email2 };
			console.log(obj);
			this.setState({ initaialValues: obj });
		};
		run();
	}

	render() {
		return (
			<div>
				<SurveyForm
					initialValues={this.state.initaialValues}
					handleSubmit={() => {
						console.log(this.state);
					}}
					submitButtonName="Send"
					submitButtonIconName="email"
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { surveys: state.surveys };
};

export default connect(mapStateToProps, { fetchSurvey })(SurveyListItemEdit);
