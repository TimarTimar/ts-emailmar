import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Landing = ({ auth }) => {
	return (
		<div>
			<h2 className="header">Welcome</h2>
			<div className="card horizontal">
				<div className="card-stacked">
					<div className="card-content">
						<p>Create and Send micro-surveys to your team.</p>
					</div>
					<div className="card-action">
						{auth ? (
							<Link to="/surveys/new">Create new survey</Link>
						) : (
							<a href="/auth/google">Login with Google</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(Landing);
