import { RequestHandler, rest } from "msw";
import { API_BASE_URL } from "../shared/constants";
import mockData from "../../mock/mock-data.json";

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
	rest.get(`${API_BASE_URL}/games`, (request, response, context) =>
		response(context.json(mockData.games))
	),
	rest.get(`${API_BASE_URL}/categories`, (request, response, context) =>
		response(context.json(mockData.categories))
	),
];
