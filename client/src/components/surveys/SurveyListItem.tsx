import React from "react";
import { Link } from "react-router-dom";
import {Survey} from '../../reducers/types';

export interface SurveyWithModalAndFilter extends Survey{
	showModal:(id:string)=>void
	filter:string
	}

const SurveyListItem = ({
	_id,
	state,
	title,
	body,
	dateSent,
	yes,
	no,
	showModal,
}:SurveyWithModalAndFilter) => {
	const conditionalDraftRendering = (_id:string, state:"sent" | "draft") => {
		return {
			renderSendButton:
				state === "draft" ? (
					<a className="btn red" href={`/api/quick_send_survey/${_id}`}>
						Quick Send
					</a>
				) : null,
			renderEditButton:
				state === "draft" ? (
					<Link to={`/edit_survey/${_id}`} className="yellow btn darken-4">
						Edit
					</Link>
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
				<p>
					Sent on:{" "}
					{dateSent ? new Date(dateSent).toLocaleDateString("ko-KR") : "-"}
				</p>
				<h5>
					Yes: {yes} No: {no}
				</h5>
			</div>
			<div
				className="card-action"
				style={{
					display: "flex",
					justifyContent: "flex-end",
					alignItems: "center",
					height: "50px",
					margin: "10px 0px",
				}}
			>
				{conditionalDraftRendering(_id, state).renderEditButton}
				{conditionalDraftRendering(_id, state).renderSendButton}
				<button className="btn right" onClick={() => showModal(_id)}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default SurveyListItem;
