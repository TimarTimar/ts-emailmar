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
	filter,
}) => {
	const conditionalDraftRendering = (_id, state) => {
		return {
			renderSendButton:
				state === "draft" ? (
					<a className="btn red" href={`/api/send_survey/${_id}`}>
						Send
					</a>
				) : null,
			cardBgColor: state === "draft" ? "purple" : "blue-grey",
			stateIconName: state === "draft" ? "drafts" : "email",
		};
	};

	return (
		<div
			className={`card ${
				conditionalDraftRendering(_id, state).cardBgColor
			} darken-1`}
		>
			<div className="card-content white-text">
				<span className="card-title">
					{title}{" "}
					<i className="medium material-icons right">
						{conditionalDraftRendering(_id, state).stateIconName}
					</i>
				</span>
				<p>{body}</p>
				<p>Sent on: {new Date(dateSent).toLocaleDateString("ko-KR")}</p>
			</div>
			<div className="card-action">
				<a>Yes: {yes}</a>
				<a>No: {no}</a>
				{conditionalDraftRendering(_id, state).renderSendButton}
				<button className="btn right" onClick={() => showModal(_id)}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default SurveyListItem;
