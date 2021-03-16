//SurveyForm shows a form for a user to add input
import _ from "lodash";
import React, { ReactNode } from "react";
import { reduxForm, Field, Form, InjectedFormProps } from "redux-form";
import { Link } from "react-router-dom";
import formFields from "./formFields";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";

interface SurveyFormProps{
	onSurveySubmit:()=>any,
	handleSubmit:any,
	children:ReactNode,
	submitbuttonname:string,
	submitbuttoniconname:string,
};

//It seems redux-form expects class based components, I couldn't add customprops

const SurveyForm = (props:any) => {
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
			<form onSubmit={props.handleSubmit(props.onSurveySubmit)}>
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
					<button
						name={props.submitbuttonname}
						value={props.submitbuttoniconname}
						className="teal btn-flat right white-text"
						type="submit"
					>
						{props.submitbuttonname}
						<i className="material-icons right">{props.submitbuttoniconname}</i>
					</button>
				</div>
			</form>
		</div>
	);
};

function validate(values:any) {
	const errors:any = {};

	// after click countinue on form change emails like this and  str = str.replace(/,\s*$/, "");

	if (values.recipients !== undefined) {
		errors.recipients = validateEmails(
			values.recipients.endsWith(",")
				? values.recipients.slice(0, -1)
				: values.recipients || ""
		);
	}

	_.each(formFields, ({ name }:any) => {
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