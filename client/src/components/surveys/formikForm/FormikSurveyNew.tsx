// SurveyNew shows SurveyForm and SurveyReview
import React, { useState } from "react";
import { FormikSurveyForm } from "./FormikSurveyForm";

export const FormikSurveyNew = () => {
	//state = { showFormReview: false };

	const [showFormReview, setShowFormReview] = useState(false);

	const renderContent = () => {
		//	if (showFormReview) {
		//		return <FormikFormReview onCancel={() => setShowFormReview(false)} />;
		//	}
		//
		return (
			<FormikSurveyForm
				handleSubmit={() => setShowFormReview(true)}
				initialValues={{ title: "", subject: "", body: "", participants: "" }}
			/>
		);
	};

	return <div>{renderContent()}</div>;
};
