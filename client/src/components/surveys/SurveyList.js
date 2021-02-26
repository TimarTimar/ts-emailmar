import React from "react";
import Modal from "../Modal";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends React.Component {
	constructor() {
		super();
		this.state = {
			isOpen: false,
			selectedSurvey: null,
			sort: "asc",
		};
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
	}

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

		return surveyArray.map((survey) => {
			return (
				<div className="card blue-grey darken-1" key={survey._id}>
					<div className="card-content white-text">
						<span className="card-title">{survey.title}</span>
						<p>{survey.body}</p>
						<p>
							Sent on: {new Date(survey.dateSent).toLocaleDateString("ko-KR")}
						</p>
					</div>
					<div className="card-action">
						<a>Yes: {survey.yes}</a>
						<a>No: {survey.no}</a>
						<button
							className="btn right"
							onClick={() => this.showModal(survey._id)}
						>
							Delete
						</button>
					</div>
				</div>
			);
		});
	}

	render() {
		return (
			<main>
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
