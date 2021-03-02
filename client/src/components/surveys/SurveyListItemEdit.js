import _ from "lodash";
import React from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import { connect } from "react-redux";

class SurveyListItemEdit extends React.Component {
	render() {
		return (
			<div>
				<SurveyForm
					handleSubmit={() => {
						console.log(this.props);
					}}
				/>
				<p>{JSON.stringify(this.props)}</p>
			</div>
		);
	}
}

const mapStateToProps = ({ surveys }, ownProps) => {
	return { surveys };
};

export default connect(mapStateToProps)(SurveyListItemEdit);
