import React from "react";
import "./modal.css";

const Modal = ({ handleClose, show, children, handleConfirm }) => {
	const showHideClassName = show ? "modal display-block" : "modal display-none";

	return (
		<div className={showHideClassName}>
			<div className="wrapper">
				<i className="large material-icons">delete</i>
			</div>
			<section className="modal-main">
				{children}
				<button className="btn left" onClick={handleClose}>
					Cancel
				</button>
				<a className="btn right" href={handleConfirm}>
					Ok
				</a>
			</section>
		</div>
	);
};

export default Modal;
