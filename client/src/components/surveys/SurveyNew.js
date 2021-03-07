// SurveyNew shows SurveyForm and SurveyReview
import React, { useState } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";

const SurveyNew = () => {
	//state = { showFormReview: false };

	const [showFormReview, setShowFormReview] = useState(false);

	const renderContent = () => {
		if (showFormReview) {
			return <SurveyFormReview onCancel={() => setShowFormReview(false)} />;
		}

		return (
			<SurveyForm
				onSurveySubmit={() => setShowFormReview(true)}
				submitbuttonname="Continue"
				submitbuttoniconName="arrow_forward"
			/>
		);
	};

	return <div>{renderContent()}</div>;
};

export default reduxForm({
	form: "surveyForm",
})(SurveyNew);
