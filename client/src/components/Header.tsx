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
					<li key="1" className="pr-4">
						<Payments />
					</li>,
					<li key="3" className="pr-4">
						Credits: {auth.credits}
					</li>,
					<li key="2" className="pr-4">
						<a href="/api/logout">Logout</a>
					</li>,
				];
		}
	};

	return (
		<div>
			<nav className="flex justify-between mx-auto bg-blue-300 border-gray-400 hover:shadow-inner">
				<div className="pl-4">
					<Link
						className="text-lg hover:text-green-200"
						to={auth ? "/surveys" : "/"}
					>
						Emailmar
					</Link>
				</div>
				<ul className="flex">{renderContent()}</ul>
			</nav>
		</div>
	);
};

export default Header;
