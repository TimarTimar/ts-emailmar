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
			this.setState({ initaialValues: obj });
		};
		run();
	}

	saveasdraft() {
		if (!this.props.formValues) {
			return;
		}
		console.log({
			...this.props.surveys[0],
			...this.props.formValues.values,
		});
	}

	render() {
		return (
			<div>
				<SurveyForm
					initialValues={this.state.initaialValues}
					handleSubmit={() => {
						console.log(this.state);
					}}
					submitbuttonname="Send"
					submitbuttoniconname="email"
					onsaveasdraft={this.saveasdraft()}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { surveys: state.surveys, formValues: state.form.surveyForm };
};

export default connect(mapStateToProps, { fetchSurvey })(SurveyListItemEdit);
