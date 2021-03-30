import axios from "axios";
import { FormikSurveyFormValues } from "./types";

// Sending survey after editing
export const sendSurvey = async (
	values: FormikSurveyFormValues,
	setIsLoading: (value: React.SetStateAction<boolean>) => void,
	surveyId: string
) => {
	setIsLoading(true);
	await axios.patch(`/api/send_survey/${surveyId}`, values);
	window.location.assign("/surveys");
};

//Saving survey as draft after editing
export const saveAsDraft = async (
	values: any,
	setIsLoading: (value: React.SetStateAction<boolean>) => void,
	surveyId: string
) => {
	setIsLoading(true);
	await axios.patch(`/api/edit_survey/${surveyId}`, values);
	window.location.assign("/surveys");
};
