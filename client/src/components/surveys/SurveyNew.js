//I switched to Formik from ReduxForm, this functionality can be find in formikForm/FormikSurveyNew

// SurveyNew shows SurveyForm and SurveyReview
/*
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

		return <SurveyForm onSurveySubmit={() => setShowFormReview(true)} />;
	};

	return <div>{renderContent()}</div>;
};

export default reduxForm({
	form: "surveyForm",
})(SurveyNew);

*/
