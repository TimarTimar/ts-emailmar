import axios from "axios";
import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { SurveyState } from "../../../reducers/types";
import { FormikSurveyForm } from "./FormikSurveyForm";
import { FetchSurveyResponseData, FormikSurveyFormValues } from "./types";

interface FormikSurveyListItemEditProps {}

const FormikButtons = (props: any) => {
	console.log("PROPS:", props);
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

export const FormikSurveyListItemEdit: React.FC<FormikSurveyListItemEditProps> = ({}) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const main = async () => {
			const { data }: FetchSurveyResponseData = await axios.get(
				`/api/fetch_survey/${surveyId}`
			);
			console.log("huuuu", data);
			const recipients = data.recipients
				.map((item: any) => {
					return item.email;
				})
				.toLocaleString();
			const FormikInitialValues = {
				title: data.title,
				subject: data.subject,
				body: data.body,
				recipients,
			};
			setFormikFormValues(FormikInitialValues);
			setIsLoading(false);
			console.log("sajkdfhakldjlas");
		};
		main();
	}, []);
	const { surveyId }: { surveyId: string } = useParams();

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

	if (isLoading === false) {
		return (
			<FormikSurveyForm
				formTitle={"Edit Survey"}
				onCancel={(e: Event) => {
					e.preventDefault();
					e.stopPropagation();
					window.location.assign("/surveys");
				}}
				handleSubmit={(data: FormikSurveyFormValues) => {
					sendSurvey(data);
				}}
				initialValues={formikFormValues}
			>
				<FormikButtons />
			</FormikSurveyForm>
		);
	} else {
		return <div>I'm loading</div>;
	}
};
