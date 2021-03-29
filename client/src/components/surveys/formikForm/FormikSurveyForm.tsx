import * as React from "react";
import { Formik, Form, Field } from "formik";
import { FormikSurveyFormValues } from "./types";
import { SurveyFormSchema } from "./SurveyFormValidation";

/*
const MyTextInput = ({ label, ...props }: any) => {
	// useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
	// which we can spread on <input> and alse replace ErrorMessage entirely.
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input className="text-input" {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="error">{meta.error}</div>
			) : null}
		</>
	);
};*/

interface FormikFormSurveyProps {
	handleSubmit: any;
	initialValues: FormikSurveyFormValues;
	onCancel: any;
	formTitle: string;
}

export const FormikSurveyForm: React.FC<FormikFormSurveyProps> = (props) => {
	return (
		<div>
			<h4>{props.formTitle}</h4>
			<Formik
				enableReinitialize={true}
				initialValues={props.initialValues}
				onSubmit={props.handleSubmit}
				validationSchema={SurveyFormSchema}
			>
				{({ errors, touched }) => (
					<Form>
						<Field id="title" name="title" placeholder="Your Title" />
						{errors.title && touched.title ? (
							<div className={"card-panel red darken-4 white-text"}>
								{errors.title}
							</div>
						) : null}
						<Field id="subject" name="subject" placeholder="Email's Subject" />
						{errors.subject && touched.subject ? (
							<div className={"card-panel red darken-4 white-text"}>
								{errors.subject}
							</div>
						) : null}
						<Field id="body" name="body" placeholder="Email's body" />
						{errors.body && touched.body ? (
							<div className={"card-panel red darken-4 white-text"}>
								{errors.body}
							</div>
						) : null}
						<Field
							id="recipients"
							name="recipients"
							placeholder="Comma separated emails"
						/>
						{errors.recipients && touched.recipients ? (
							<div className={"card-panel red darken-4 white-text"}>
								{errors.recipients}
							</div>
						) : null}
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								height: "50px",
								margin: "10px 0px",
							}}
						>
							<button
								className="btn red left"
								onClick={props.onCancel}
								name="cancelButton"
							>
								Cancel
							</button>
							{props.children}
							<button
								className="btn pink right"
								type="submit"
								name="sendButton"
							>
								Submit
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
function useField(props: { [x: string]: any }): [any, any] {
	throw new Error("Function not implemented.");
}
