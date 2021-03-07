import _ from "lodash";
import React, { useEffect, useState } from "react";
import { fetchSurvey } from "../../actions/index";
import { useSelector, useDispatch } from "react-redux";
import SurveyForm from "./SurveyForm";
import axios from "axios";

const SurveyListItemEdit = (props) => {
	const surveys = useSelector((state) => state.surveys);
	console.log(surveys);
	const formValues = useSelector((state) => state.form.surveyForm);
	const dispatch = useDispatch();

	const [initaialValues, setInitialValues] = useState(null);

	useEffect(() => {
		dispatch(fetchSurvey(props.match.params.surveyId));
	}, []);

	useEffect(() => {
		const values = _.pick(surveys[0], ["title", "subject", "body"]);
		const email2 = _.get(surveys[0], ["recipients", 0, "email"]);
		const obj = { ...values, recipients: email2 };
		setInitialValues(obj);
	}, [surveys]);

	const saveAsDraft = async () => {
		const surveyId = props.match.params.surveyId;
		await axios.patch(`/api/edit_survey/${surveyId}`, {
			...surveys[0],
			...formValues.values,
		});
		window.location = "/surveys";
	};

	const sendEmail = async () => {
		const surveyId = props.match.params.surveyId;
		await axios.patch(`/api/send_survey/${surveyId}`, {
			...surveys[0],
			...formValues.values,
		});
	};

	return (
		<div>
			<SurveyForm
				initialValues={initaialValues}
				onSurveySubmit={() => sendEmail().then((window.location = "/surveys"))}
				submitbuttonname="Send"
				submitbuttoniconname="email"
			>
				<button
					className="purple btn-flat white-text right"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						saveAsDraft();
					}}
				>
					Save As Draft
				</button>
			</SurveyForm>
		</div>
	);
};

export default SurveyListItemEdit;
