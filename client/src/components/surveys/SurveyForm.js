//SurveyForm shows a form for a user to add input
import _ from "lodash";
import React from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import formFields from "./formFields";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";

const SurveyForm = (props) => {
	const renderFields = () => {
		return _.map(formFields, ({ label, name }) => {
			return (
				<Field
					key={name}
					component={SurveyField}
					type="text"
					label={label}
					name={name}
				/>
			);
		});
	};

	return (
		<div>
			<form
				onSubmit={props.handleSubmit(props.onSurveySubmit)}
				submitbuttonname={props.submitbuttonname}
				submitbuttoniconname={props.submitbuttoniconname}
			>
				<div>{renderFields()}</div>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						height: "50px",
						margin: "10px 0px",
					}}
				>
					<Link to="/surveys" className="red btn-flat white-text">
						Cancel
					</Link>
					{props.children}
					<button className="teal btn-flat right white-text" type="submit">
						{props.submitbuttonname}
						<i className="material-icons right">{props.submitbuttoniconname}</i>
					</button>
				</div>
			</form>
		</div>
	);
};

function validate(values) {
	const errors = {};

	// after click countinue on form change emails like this and  str = str.replace(/,\s*$/, "");

	if (values.recipients !== undefined) {
		errors.recipients = validateEmails(
			values.recipients.endsWith(",")
				? values.recipients.slice(0, -1)
				: values.recipients || ""
		);
	}

	_.each(formFields, ({ name }) => {
		if (!values[name]) {
			errors[name] = `Missing ${name}! You must provide a value`;
		}
	});

	return errors;
}

export default reduxForm({
	validate,
	form: "surveyForm",
	enableReinitialize: true,
	destroyOnUnmount: false,
})(SurveyForm);
