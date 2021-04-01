import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect, useDispatch } from "react-redux";
import { handleToken } from "../actions";
import { tw } from "./TwClasses";

const Payments = () => {
	const dispatch = useDispatch();
	return (
		<StripeCheckout
			name="Emailmar"
			description="$5 for 5 email credits"
			amount={500}
			token={(token) => dispatch(handleToken(token))} // submit callback
			stripeKey={
				process.env.REACT_APP_STRIPE_KEY
					? process.env.REACT_APP_STRIPE_KEY
					: "Stripe Key Not Provided"
			}
		>
			<button className={tw.button}>Add Credits</button>
		</StripeCheckout>
	);
};

export default Payments;
