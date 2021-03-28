// SurveyNew shows SurveyForm and SurveyReview, you can jump back and force review and edit formvalues
import axios from "axios";
import { useFormikContext } from "formik";
import React, { useState } from "react";
import { FormikSurveyForm, FormikSurveyFormValues } from "./FormikSurveyForm";

const FormikButtons = () => {
	const formik = useFormikContext();

	const saveAsDraft = async (formValues: FormikSurveyFormValues | unknown) => {
		await axios.post("/api/save_as_draft", formValues);
		window.location.assign("/surveys");
	};

	React.useEffect(() => {
		console.group("Formik State");
		console.log("values", formik.values);
		console.log("errors", formik.errors);
		console.log("touched", formik.touched);
		console.log("isSubmitting", formik.isSubmitting);
		console.log("isValidating", formik.isValidating);
		console.log("submitCount", formik.submitCount);
		console.groupEnd();
	}, [
		formik.values,
		formik.errors,
		formik.touched,
		formik.isSubmitting,
		formik.isValidating,
		formik.submitCount,
	]);
	return (
		<button
			className="btn"
			onClick={() => saveAsDraft(formik.values)}
			type="button"
		>
			Save As Draft
		</button>
	);
};

export const FormikSurveyNew = () => {
	const [showFormReview, setShowFormReview] = useState(false);
	const [formikFormValues, setFormikFormValues] = useState({
		title: "",
		subject: "",
		body: "",
		recipients: "",
	});

	const sendSurvey = async (values: FormikSurveyFormValues) => {
		await axios.post("/api/surveys", values);
		window.location.assign("/");
	};

	const renderContent = () => {
		if (showFormReview) {
			return (
				<div>
					<h4>Review</h4>
					<div>
						<label>Emailmar Title</label>
						<div>{formikFormValues.title}</div>
						<label>Email's Subject</label>
						<div>{formikFormValues.subject}</div>
						<label>Email's body</label>
						<div>{formikFormValues.body}</div>
						<label>recipients</label>
						<div>{formikFormValues.recipients}</div>
					</div>
					<div style={{ marginTop: "20px" }}>
						<button
							className="btn red left"
							onClick={() => setShowFormReview(false)}
						>
							cancel
						</button>
						<button
							className="btn teal right"
							onClick={() => {
								console.log(formikFormValues);
								sendSurvey(formikFormValues);
							}}
						>
							Send
						</button>
					</div>
				</div>
			);
		} else {
			return (
				<FormikSurveyForm
					formTitle={"Create Survey"}
					onCancel={(e: Event) => {
						e.preventDefault();
						e.stopPropagation();
						window.location.assign("/surveys");
					}}
					handleSubmit={(data: FormikSurveyFormValues) => {
						setShowFormReview(true);
						setFormikFormValues(data);
					}}
					initialValues={formikFormValues}
				>
					<FormikButtons />
				</FormikSurveyForm>
			);
		}
	};

	return <div>{renderContent()}</div>;
};
