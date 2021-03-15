import { Express } from "express";

const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app:Express) => {
	app.post("/api/stripe", requireLogin, async (req:any, res) => {
		const charge = await stripe.charges.create({
			amount: 5000,
			currency: "usd",
			source: req.body.id,
			description: "$5 for 5 credits",
		});

		req.user.credits += 5;
		const user = await req.user.save();

		res.send(user);
	});
};
