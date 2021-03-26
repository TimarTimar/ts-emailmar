import * as React from "react";
import {
	Formik,
	FormikHelpers,
	FormikProps,
	Form,
	Field,
	FieldProps,
} from "formik";

interface MyFormValues {
	title: string;
	subject: string;
	body: string;
	participants: string;
}

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
};

interface FormikFormSurveyProps {
	handleSubmit: any;
	initialValues: MyFormValues;
}

export const FormikSurveyForm: React.FC<FormikFormSurveyProps> = (props) => {
	const initialValues: MyFormValues = {
		title: "",
		subject: "",
		body: "",
		participants: "",
	};
	return (
		<div>
			<h1>My Example</h1>
			<Formik initialValues={props.initialValues} onSubmit={props.handleSubmit}>
				<Form>
					<Field id="title" name="title" placeholder="Your Title" />
					<Field id="subject" name="subject" placeholder="Email's Subject" />
					<Field id="body" name="body" placeholder="Email's body" />
					<Field
						id="participants"
						name="participants"
						placeholder="Comma separated emails"
					/>
					<button className="btn" type="submit">
						Submit
					</button>
				</Form>
			</Formik>
		</div>
	);
};
function useField(props: { [x: string]: any }): [any, any] {
	throw new Error("Function not implemented.");
}
