import React from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../reducers";
import Payments from "./Payments";

const Header = () => {
	const auth = useSelector((state: RootState) => state.auth);
	const renderContent = () => {
		switch (auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href="/auth/google">Login with Google</a>
					</li>
				);
			default:
				return [
					<li key="1">
						<Payments />
					</li>,
					<li key="3" style={{ margin: "0 15px" }}>
						Credits: {auth.credits}
					</li>,
					<li key="2">
						<a href="/api/logout">Logout</a>
					</li>,
				];
		}
	};

	return (
		<div>
			<nav className="flex justify-between mx-auto bg-blue-300 border-gray-400 hover:shadow-inner">
				<div className="pl-4">
					<Link to={auth ? "/surveys" : "/"}>Emailmar</Link>
				</div>
				<ul className="flex pr-4">{renderContent()}</ul>
			</nav>
		</div>
	);
};

export default Header;
