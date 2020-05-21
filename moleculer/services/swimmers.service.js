"use strict";

const DbService = require("moleculer-db");
const MongoDBAdapter = require("moleculer-db-adapter-mongo");

module.exports = {
	name: "swimmers",

	mixins: [DbService],
	adapter: new MongoDBAdapter("mongodb+srv://admin:1234@cluster0-irjgd.mongodb.net/test?retryWrites=true&w=majority"),
	collection: "swimmers",

	dependencies: ["mail"],

	actions: {
		list: {
			rest: {
				method: "GET",
				path: "/list"
			},
			async handler() {
				return this.adapter.find({sort: ["-result"]});
			}
		},

		update: {
			rest: {
				method: "GET",
				path: "/update"
			},
			async handler(ctx) {
				const swimmers = await this.adapter.find({sort: ["-result"]});

				let currSwimmer;
				for (let i = swimmers.length - 1; i >= 0; i--) {
					if (!currSwimmer) {
						if (swimmers[i]._id == String(ctx.params.swimmer_id)) {
							currSwimmer = swimmers[i];
							currSwimmer.result += Number(ctx.params.result);
						} else {
							continue;
						}
					}

					if (currSwimmer.result > swimmers[i].result) {
						currSwimmer.position--;
						swimmers[i].position++;
						ctx.emit("mail.notify", { looserName: swimmers[i].name, winnerName: currSwimmer.name });
					}
				}

				for (let swimmer of swimmers) {
					await this.adapter.updateById(swimmer._id, {"$set": {position: swimmer.position, result: swimmer.result}});
				}

				return this.adapter.find({sort: ["-result"]});
			}
		},

		add: {
			rest: {
				method: "GET",
				path: "/add"
			},
			async handler(ctx) {
				await this.adapter.insert({
					name: ctx.params.name,
					result: 0,
					position: Number(ctx.params.position),
				});

				return this.adapter.find({sort: ["-result"]});
			}
		},
	},
};
