import _ from "lodash";
import { Path } from "path-parser";
import { URL } from "url";

const requireLogin = require ('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
import Mailer from "../services/Mailer";
import surveyTemplate from "../services/emailTemplates/surveyTemplate";

//we got the Class
import { Survey } from "../models/Survey";
import { Express } from "express";

module.exports = (app:Express) => {
	app.all("/api/delete_survey/:surveyId", requireLogin, async (req, res) => {
		const surveyId = req.param("surveyId");
		await Survey.findByIdAndRemove(surveyId).catch((error) => console.log(error));
		res.redirect("/surveys");
	});

	app.get("/api/surveys", requireLogin, async (req:any, res) => {
		const surveys = await Survey.find({ _user: req.user.id }).select({
			recipients: false,
		});

		res.send(surveys);
	});

	app.get("/api/surveys/:surveyId/:choice", (req, res) => {
		res.send("Thanks for voting");
	});

	app.post("/api/surveys/webhooks", (req, res) => {
		const p = new Path("/api/surveys/:surveyId/:choice");

		_.chain(req.body)
			.map(({ email, url }) => {
				//return null if cant extract these from url
				const match = p.test(new URL(url).pathname);
				if (match) {
					return { email, surveyId: match.surveyId, choice: match.choice };
				}
			})
			//remove undefined elements
			.compact()
			.uniqBy(["email", "surveyId"])
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne(
					{
						_id: surveyId,
						recipients: {
							$elemMatch: { email: email, responded: false },
						},
					},
					{
						$inc: { [choice]: 1 },
						$set: { "recipients.$.responded": true },
						lastResponded: new Date(),
					}
				).exec();
			})
			.value();

		res.send({});
	});

	app.get("/api/fetch_survey/:surveyId", requireLogin, async (req, res) => {
		const surveyId = req.param("surveyId");
		const response = await Survey.findOne({ _id: surveyId }).exec();
		res.send(response);
	});

	app.post("/api/save_as_draft", requireLogin, async (req:any, res, next) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients
				.split(",")
				.map((email:any) => ({ email: email.trim() })),
			_user: req.user.id,
		});

		try {
			await survey.save();
			res.send(survey);
		} catch (err) {
			res.status(500).send(err);
		}
	});

	app.patch("/api/edit_survey/:surveyId", requireLogin, async (req, res) => {
		const surveyId = req.param("surveyId");
		const filter = { _id: surveyId };
		const { title, subject, body, recipients } = req.body;
		const response = await Survey.findOneAndUpdate(
			filter,
			{
				title,
				subject,
				body,
				recipients: { email: recipients },
			},
			{ new: true }
		).catch((error) => console.log(error));
		res.send(response);
	});

	app.patch(
		"/api/send_survey/:surveyId",
		requireLogin,
		requireCredits,
		async (req:any, res) => {
			const surveyId = req.param("surveyId");
			const filter = { _id: surveyId };
			const { title, subject, body, recipients } = req.body;
			const update = {
				title,
				subject,
				body,
				recipients: { email: recipients },
				state: "sent",
				dateSent: Date.now(),
			};
			const response = await Survey.findOneAndUpdate(filter, update, {
				new: true,
			});

			if (response){
				const mailer = new Mailer(response, surveyTemplate(response));
				try {
					await mailer.send();
					req.user.credits -= 1;
					const user = await req.user.save();
				} catch (err) {
					res.status(422).send(err);
				}
			}else{
				return
			}			
		}
	);

	app.get(
		"/api/quick_send_survey/:surveyId",
		requireLogin,
		requireCredits,
		async (req:any, res) => {
			const surveyId = req.param("surveyId");
			const filter = { _id: surveyId };
			const update = { state: "sent", dateSent: Date.now() };
			const response = await Survey.findOneAndUpdate(filter, update);

			//attempt to Send
			if (response){
				const mailer = new Mailer(response, surveyTemplate(response));
			try {
				await mailer.send();
				req.user.credits -= 1;
				const user = await req.user.save();
				res.redirect("/surveys");
			} catch (err) {
				res.status(422).send(err);
			}
			}else{
				return
			}
		}
	);

	app.post("/api/surveys", requireLogin, requireCredits, async (req:any, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients
				.split(",")
				.map((email:string) => ({ email: email.trim() })),
			_user: req.user.id,
			state: "sent",
			dateSent: Date.now(),
		});

		//attempt to Send
		const mailer = new Mailer(survey, surveyTemplate(survey));

		try {
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();
			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
