import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect, useDispatch } from "react-redux";
import { handleToken } from "../actions";

const Payments = (props) => {
	const dispatch = useDispatch();
	return (
		<StripeCheckout
			name="Emailmar"
			description="$5 for 5 email credits"
			amount={500}
			token={(token) => dispatch(handleToken(token))} // submit callback
			stripeKey={process.env.REACT_APP_STRIPE_KEY}
		>
			<button className="btn">Add Credits</button>
		</StripeCheckout>
	);
};

export default Payments;
