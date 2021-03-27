// SurveyNew shows SurveyForm and SurveyReview
import axios from "axios";
import { FormikValues, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { getFormInitialValues } from "redux-form";
import { FormikSurveyForm, FormikSurveyFormValues } from "./FormikSurveyForm";

const FormikData = () => {
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
			style={{ marginLeft: "40px" }}
			onClick={() => saveAsDraft(formik.values)}
			type="button"
		>
			Save As Draft
		</button>
	);
};

/*
interface FormikReviewProps {

}

export const FormikReview: React.FC<FormikReviewProps> = ({}) => {
		return ();
}

*/

export const FormikSurveyNew = () => {
	//state = { showFormReview: false };

	const [showFormReview, setShowFormReview] = useState(false);

	const { values } = useFormikContext() ?? {};
	useEffect(() => {
		console.log(values);
	}, [values]);

	const renderContent = () => {
		//	if (showFormReview) {
		//		return <FormikFormReview onCancel={() => setShowFormReview(false)} />;
		//	}
		//
		return (
			<FormikSurveyForm
				onCancel={(e: Event) => {
					e.preventDefault();
					e.stopPropagation();
					console.log("I am cancelling");
				}}
				handleSubmit={(e: FormikValues) => console.log(e)}
				initialValues={{ title: "", subject: "", body: "", recipients: "" }}
			>
				<FormikData />
			</FormikSurveyForm>
		);
	};

	return <div>{renderContent()}</div>;
};
