const nodemailer = require("nodemailer");

module.exports = {
	name: "mail",

	events: {
		"mail.notify"(payload) {
			const transporter = nodemailer.createTransport({
				service: "yandex",
				auth: {
					user: "rv-test-rv@yandex.ru",
					pass: "Q1W2E3r4",
				}
			});

			const mailOptions = {
				from: "rv-test-rv@yandex.ru",
				to: "rv-test-rv@yandex.ru",
				subject: `Привет, ${payload.looserName}! Тебя обошёл ${payload.winnerName}`,
				text: `Привет, ${payload.looserName}! Тебя обошёл ${payload.winnerName}`,
			};

			transporter.sendMail(mailOptions, function(error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log("Email sent: " + info.response);
				}
			}); 
		}
	}
};