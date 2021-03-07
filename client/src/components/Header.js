import React from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

const Header = (props) => {
	const auth = useSelector((state) => state.auth);
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
			<nav>
				<div className="nav-wrapper blue-grey">
					<Link to={auth ? "/surveys" : "/"} className="left brand-logo">
						<i className="material-icons">dashboard</i>Emailmar
					</Link>
					<a href="#" data-target="mobile" className="sidenav-trigger right">
						<i className="material-icons">menu</i>
					</a>
					<ul className="right hide-on-med-and-down">{renderContent()}</ul>
				</div>
			</nav>
			<ul className="sidenav" id="mobile">
				{renderContent()}
			</ul>
		</div>
	);
};

export default Header;
