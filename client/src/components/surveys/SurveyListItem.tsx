import React from "react";
import { Link } from "react-router-dom";
import { Survey } from "../../reducers/types";
import { tw } from "../TwClasses";
import { FaEnvelopeOpen, FaEnvelope } from "react-icons/fa";

export interface SurveyWithModalAndFilter extends Survey {
	showModal: (id: string) => void;
	filter: string;
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
}: SurveyWithModalAndFilter) => {
	const conditionalDraftRendering = (_id: string, state: "sent" | "draft") => {
		return {
			renderSendButton:
				state === "draft" ? (
					<a
						className={tw.button.white.toString().concat(" p-2 mx-1.5")}
						href={`/api/quick_send_survey/${_id}`}
					>
						Quick Send
					</a>
				) : null,
			renderEditButton:
				state === "draft" ? (
					<Link
						to={`/edit_survey/${_id}`}
						className={tw.button.white.toString().concat(" p-2")}
					>
						Edit
					</Link>
				) : null,
			cardBgColor: state === "draft" ? "bg-blue-300" : "bg-green-600",
			stateIcon:
				state === "draft" ? (
					<FaEnvelopeOpen className="text-5xl" />
				) : (
					<FaEnvelope className="text-5xl" />
				),
		};
	};

	return (
		<div className="rounded-md p-2">
			<div
				className={`${conditionalDraftRendering(_id, state).cardBgColor.concat(
					" flex justify-between relative rounded p-2 mt-1.5 border-gray-200 border-2 transition-shadow text-white"
				)}`}
			>
				<div className="h-32 max-w-4xl">
					<span className="text-xl underline">{title}</span>
					<p>{body}</p>
					<p>
						Sent on:{" "}
						{dateSent ? new Date(dateSent).toLocaleDateString("ko-KR") : "-"}
					</p>
					<h5>
						Yes: {yes} No: {no}
					</h5>
				</div>
				<div>{conditionalDraftRendering(_id, state).stateIcon}</div>
			</div>
			<div className="flex justify-end items-center h-12 mb-2.5 pr-4 border-gray-400 bg-gray-100">
				{conditionalDraftRendering(_id, state).renderEditButton}
				{conditionalDraftRendering(_id, state).renderSendButton}
				<button
					className={tw.button.white.toString().concat(" p-2")}
					onClick={() => showModal(_id)}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default SurveyListItem;
