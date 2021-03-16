//Survey field contains logic to render a single label and text input

import React from "react";

interface SurveyFieldProps{
	input:string,
	label:string,
	meta:{error:string, touched:boolean}
}

const SurveyField = ({ input, label, meta: { error, touched }}:SurveyFieldProps) => {
	return (
		<div>
			<label>{label}</label>
			<input {...input} style={{ marginBottom: "10px" }} />
			<div className="red-text" style={{ marginBottom: "20px" }}>
				{touched && error}
			</div>
		</div>
	);
};

export default SurveyField;
