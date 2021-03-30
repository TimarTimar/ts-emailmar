import * as React from "react";
import { Formik, Form, Field } from "formik";
import { FormikSurveyFormValues } from "./types";
import { SurveyFormSchema } from "./SurveyFormValidation";

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
			<h4>{props.formTitle}</h4>
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
								<div>
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
											<div className={"card-panel red darken-2 white-text"}>
												{errors[item]}
											</div>
										) : null}
									</span>
								</div>
							);
						})}
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								height: "50px",
								margin: "10px 0px",
							}}
						>
							<button
								className="btn red left"
								onClick={props.onCancel}
								name="cancelButton"
							>
								Cancel
							</button>
							{props.children}
							<button
								className="btn pink right"
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
