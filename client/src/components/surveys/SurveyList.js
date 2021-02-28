import React from "react";
import Modal from "../Modal";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";
import SurveyListItem from "./SurveyListItem";
import { filter } from "lodash";

class SurveyList extends React.Component {
	constructor() {
		super();
		this.state = {
			isOpen: false,
			selectedSurvey: null,
			sort: "asc",
			filter: "sent-draft",
		};
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = (e) => {
		this.setState({ filter: e.target.value });
	};

	showModal = (id) => {
		this.setState({ isOpen: true });
		this.setState({ selectedSurvey: id });
	};

	hideModal = () => {
		this.setState({ isOpen: false });
	};

	componentDidMount() {
		this.props.fetchSurveys();
		console.log(this.state);
	}

	renderFilterSelection() {
		const message = "You selected " + this.state.filter;
		return (
			<div>
				<select
					className="browser-default"
					value={this.state.filter}
					onChange={this.handleChange}
				>
					<option value="sent-draft">All surveys</option>
					<option value="sent">Sent surveys</option>
					<option value="draft">Draft surveys</option>
				</select>
				<p>{message}</p>
			</div>
		);
	}
	renderOrderByDateButton() {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "50px",
				}}
			>
				<button
					className="btn center"
					onClick={() => {
						this.state.sort === "asc"
							? this.setState({ sort: "desc" })
							: this.setState({ sort: "asc" });
						console.log(this.state);
					}}
				>
					Order by Date
					<i className="material-icons">
						{this.state.sort === "asc" ? "arrow_upward" : "arrow_downward"}
					</i>
				</button>
			</div>
		);
	}

	renderSurveys() {
		//Order By Date
		const surveyArray = this.props.surveys;

		if (this.state.sort === "desc") {
			surveyArray.sort((a, b) => {
				return new Date(b.dateSent) - new Date(a.dateSent);
			});
		} else {
			surveyArray.sort((a, b) => {
				return new Date(a.dateSent) - new Date(b.dateSent);
			});
		}

		return surveyArray
			.filter((survey) => this.state.filter.includes(survey.state))
			.map((survey) => {
				return (
					<SurveyListItem
						key={survey._id}
						_id={survey._id}
						state={survey.state}
						title={survey.title}
						dateSent={survey.dateSent}
						body={survey.body}
						yes={survey.yes}
						no={survey.no}
						filter={this.state.filter}
						showModal={this.showModal}
					/>
				);
			});
	}

	render() {
		return (
			<main>
				{this.renderFilterSelection()}
				{this.renderOrderByDateButton()}
				<Modal
					open={this.state.isOpen}
					onClose={this.hideModal}
					handleConfirm={`/api/delete_survey/${this.state.selectedSurvey}`}
				>
					<h1>Delete Survey</h1>
					<p>Are you sure you want to delete this survey?</p>
				</Modal>
				{this.renderSurveys()}
			</main>
		);
	}
}

const mapStateToProps = ({ surveys }) => {
	return { surveys };
};

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
