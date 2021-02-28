import React from "react";

const SurveyListItem = ({
	_id,
	state,
	title,
	body,
	dateSent,
	yes,
	no,
	showModal,
}) => {
	return (
		<div className="card blue-grey darken-1" key={_id}>
			<div className="card-content white-text">
				<span>{state}</span>
				<span className="card-title">{title}</span>
				<p>{body}</p>
				<p>Sent on: {new Date(dateSent).toLocaleDateString("ko-KR")}</p>
			</div>
			<div className="card-action">
				<a>Yes: {yes}</a>
				<a>No: {no}</a>
				<button className="btn right" onClick={() => showModal(_id)}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default SurveyListItem;
