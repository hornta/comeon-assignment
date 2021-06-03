import { RequestHandler, rest } from "msw";
import { API_BASE_URL } from "../shared/constants";
import mockData from "../../mock/mock-data.json";
import { Game } from "../types.js";

const getGameByCode = (code: string): Game | null => {
	for (const game of mockData.games) {
		if (game.code === code) {
			return game;
		}
	}
	return null;
};

export const handlers: RequestHandler[] = [
	rest.post(`${API_BASE_URL}/login`, (request, response, context) =>
		response(
			context.json({
				status: "success",
				player: {
					name: "Rebecka Awesome",
					avatar: "images/avatar/rebecka.jpg",
					event: "Last seen gambling on Starburst.",
					password: "secret",
				},
			})
		)
	),
	rest.get(`${API_BASE_URL}/games`, (request, response, context) => {
		const code = request.url.searchParams.get("code");
		if (code !== null) {
			const game = getGameByCode(code);
			if (game) {
				return response(context.json([game]));
			}
		}
		return response(context.json(mockData.games));
	}),
	rest.get(`${API_BASE_URL}/categories`, (request, response, context) =>
		response(context.json(mockData.categories))
	),
];
