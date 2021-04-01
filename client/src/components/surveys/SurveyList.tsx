import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { useSelector, useDispatch } from "react-redux";
import { fetchSurveys } from "../../actions/index";
import { SurveyState } from "../../reducers/types";
import SurveyListItem from "./SurveyListItem";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { tw } from "../TwClasses";

const SurveyList = () => {
	const dispatch = useDispatch();
	const surveys = useSelector((state: SurveyState) => state.surveys);

	const [isOpen, setIsOpen] = useState(false);
	const [selectedSurvey, setSelectedSurvey] = useState("");
	const [sorting, setSorting] = useState("asc");
	const [filter, setFilter] = useState("sent-draft");

	const showModal = (id: string) => {
		setIsOpen(true);
		setSelectedSurvey(id);
	};

	const hideModal = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		dispatch(fetchSurveys());
	}, []);

	const renderFilterSelection = () => {
		return (
			<div className="h-14 my-1.5">
				<select
					id="dropdown"
					className="h-14 flex min-w-full hover:shadow-inner border-solid border border-gray-200"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				>
					<option value="sent-draft">All surveys</option>
					<option value="sent">Sent surveys</option>
					<option value="draft">Draft surveys</option>
				</select>
			</div>
		);
	};
	const renderOrderByDateButton = () => {
		return (
			<div className="flex justify-center items-center h-14">
				<button
					className="bg-green-600 rounded p-4 text-white"
					onClick={() => {
						sorting === "asc" ? setSorting("desc") : setSorting("asc");
					}}
				>
					<span className="flex">
						<span className="pr-2">Order By Date</span>{" "}
						{sorting === "asc" ? <FaArrowUp /> : <FaArrowDown />}
					</span>
				</button>
			</div>
		);
	};

	const renderSurveys = () => {
		//Order By Date

		const surveyArray = surveys;

		if (sorting === "desc") {
			surveyArray.sort((a, b) => {
				return new Date(b.dateSent).valueOf() - new Date(a.dateSent).valueOf();
			});
		} else {
			surveyArray.sort((a, b) => {
				return new Date(a.dateSent).valueOf() - new Date(b.dateSent).valueOf();
			});
		}

		return surveyArray
			.filter((survey) => filter.includes(survey.state))
			.map((survey) => {
				return (
					<SurveyListItem
						key={survey._id}
						_id={survey._id}
						state={survey.state}
						title={survey.title}
						dateSent={survey.dateSent}
						subject={survey.subject}
						body={survey.body}
						yes={survey.yes}
						no={survey.no}
						filter={filter}
						showModal={showModal}
					/>
				);
			});
	};

	return (
		<main>
			{renderFilterSelection()}
			{renderOrderByDateButton()}
			<Modal
				open={isOpen}
				onClose={hideModal}
				handleConfirm={`/api/delete_survey/${selectedSurvey}`}
			>
				<h1>Delete Survey</h1>
				<p>Are you sure you want to delete this survey?</p>
			</Modal>
			{renderSurveys()}
		</main>
	);
};

/*
const mapStateToProps = ({ surveys }) => {
	return { surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
*/

export default SurveyList;
