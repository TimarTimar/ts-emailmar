import axios from "axios";
import { FormikValues, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { formValues } from "redux-form";
import { FormikSurveyForm } from "./FormikSurveyForm";
import { FetchSurveyResponseData, FormikSurveyFormValues } from "./types";

interface FormikSurveyListItemEditProps {}

interface FormikChildComponentProps {
	saveAsDraft: (values: FormikSurveyFormValues) => void;
}

//For getting the props
const FormikChildComponent = (props: FormikChildComponentProps) => {
	const formik = useFormikContext<FormikSurveyFormValues>();
	return (
		<button
			className="btn"
			onClick={() => props.saveAsDraft(formik.values)}
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
				.map((item) => {
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
				<FormikChildComponent
					saveAsDraft={async (values) => {
						setIsLoading(true);
						await axios.patch(`/api/edit_survey/${surveyId}`, values);
						window.location.assign("/surveys");
					}}
				/>
			</FormikSurveyForm>
		);
	} else {
		return (
			<div className="progress">
				<div className="indeterminate"></div>
			</div>
		);
	}
};
