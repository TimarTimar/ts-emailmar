import React, { CSSProperties, ReactNode } from "react";
import ReactDom from "react-dom";

const MODAL_STYLES:CSSProperties = {
	position: "fixed",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	backgroundColor: "#FFF",
	border: "5px solid red",
	borderRadius: "2%",
	padding: "50px",
	zIndex: 1000,
};

const OVERLAY_STYLES:CSSProperties = {
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: "rgba(0, 0, 0, .7)",
	zIndex: 1000,
};

export interface ModalProps{
	open:boolean,
	children:ReactNode,
	onClose:()=>any,
	handleConfirm:string
}

export default function Modal({ open, children, onClose, handleConfirm }:ModalProps) {
	if (!open) return null;
	return ReactDom.createPortal(
		<>
			<div style={OVERLAY_STYLES} />
			<div style={MODAL_STYLES}>
				{children}
				<button className="btn left" onClick={onClose}>
					Cancel
				</button>
				<a className="btn right" href={handleConfirm}>
					Confirm
				</a>
			</div>
		</>,
		document.getElementById("portal")!
	);
}
