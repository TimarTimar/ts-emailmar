import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../reducers";

const Landing = () => {
	const auth = useSelector((state: RootState) => state.auth);
	return (
		<div>
			<h1>Welcome</h1>
			<div className="card horizontal">
				<div className="card-stacked">
					<div className="card-content">
						<p>Create and Send micro-surveys to your team. Let's Gooooooo</p>
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

export default Landing;
