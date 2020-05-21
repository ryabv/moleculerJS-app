"use strict";

const DbService = require("moleculer-db");
const MongoDBAdapter = require("moleculer-db-adapter-mongo");
const CacheCleanerMixin = require("../mixins/cache.cleaner.mixin");

module.exports = {
	name: "swimmers",

	mixins: [
		DbService,
		CacheCleanerMixin([
			"cache.clean.swimmers",
		]),
	],
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

				this.broker.cacher.clean("swimmers.**");
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

				this.broker.cacher.clean("swimmers.**");
				return this.adapter.find({sort: ["-result"]});
			}
		},
	},

	methods: {
		async seedDB() {
			try {
				this.logger.info("Seed Posts collection...");

				await this.adapter.insertMany([
					{
						name: "Harry",
						result: 1000,
						position: 1,
					},
					{
						name: "Hermione",
						result: 900,
						position: 2,
					},
					{
						name: "Ron",
						result: 500,
						position: 3,
					},
				]);

				return this.clearCache();
			} catch (error) {
				if (error.name == "ServiceNotFoundError") {
					console.log("Waiting for swimmers service...");
					setTimeout(this.seedDB, 1000);
				} else {
					console.log(error);
				}
			}
		}
	},

	async afterConnected() {
		const count = await this.adapter.count();
		console.log('COUNT', count);
		if (count === 0) {
			return this.seedDB();
		}
	}
};
