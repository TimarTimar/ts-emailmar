import _ from "lodash";
import React from "react";
import formFields from "./formFields";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
	const reviewFields = () => {
		return _.map(formFields, ({ name, label }) => {
			return (
				<div key={name}>
					<label>{label}</label>
					<div>{formValues[name]}</div>
				</div>
			);
		});
	};

	const saveAsDraft = async (formValues) => {
		await axios.post("/api/save_as_draft", formValues);
		console.log("it worked?");
	};

	return (
		<div>
			<h2>Please confirm your entries</h2>
			{reviewFields()}
			<button
				className="yellow darken-3 white-text btn-flat"
				onClick={onCancel}
			>
				Back
				<i className="material-icons left">arrow_back</i>
			</button>
			<button onClick={() => saveAsDraft(formValues)}>Save As Draft</button>
			<button
				className="green btn-flat right"
				onClick={() => submitSurvey(formValues, history)}
			>
				Send Survey
				<i className="material-icons right">email</i>
			</button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		formValues: state.form.surveyForm.values,
	};
};

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
