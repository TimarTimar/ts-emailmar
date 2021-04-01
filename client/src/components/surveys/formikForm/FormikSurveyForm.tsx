import * as React from "react";
import { Formik, Form, Field } from "formik";
import { FormikSurveyFormValues } from "./types";
import { SurveyFormSchema } from "./SurveyFormValidation";
import { tw } from "../../TwClasses";

interface FormikFormSurveyProps {
	handleSubmit: any;
	initialValues: FormikSurveyFormValues;
	onCancel: any;
	formTitle: string;
}

export const FormikSurveyForm: React.FC<FormikFormSurveyProps> = (props) => {
	const SurveyFormFieldsList = [
		"title",
		"subject",
		"body",
		"recipients",
	] as const;
	return (
		<div>
			<h4 className="text-xl text-center p-2 text-gray-300">
				{props.formTitle}
			</h4>
			<Formik
				enableReinitialize={true}
				initialValues={props.initialValues}
				onSubmit={props.handleSubmit}
				validationSchema={SurveyFormSchema}
			>
				{({ errors, touched }) => (
					<Form>
						{SurveyFormFieldsList.map((item) => {
							return (
								<div key={item} className="p-2">
									<Field
										id={item}
										name={item}
										placeholder={
											item === "recipients"
												? "Comma separated emails"
												: `Your email's ${item}`
										}
									/>
									<span>
										{errors[item] && touched[item] ? (
											<div className="text-red-400">{errors[item]}</div>
										) : null}
									</span>
								</div>
							);
						})}
						<div className="flex justify-between items-center h-14 my-2.5">
							<button
								className={tw.button.white}
								onClick={props.onCancel}
								name="cancelButton"
							>
								Cancel
							</button>
							{props.children}
							<button
								className={tw.button.white}
								type="submit"
								name="sendButton"
							>
								Submit
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
