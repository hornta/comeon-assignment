import { RequestHandler, rest } from "msw";
import { API_BASE_URL } from "../shared/constants";

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
	rest.get("/reviews", (request, response, context) =>
		response(
			context.json([
				{
					id: "60333292-7ca1-4361-bf38-b6b43b90cb16",
					author: "John Maverick",
					text: "Lord of The Rings, is with no absolute hesitation, my most favored and adored book by‑far. The triology is wonderful‑ and I really consider this a legendary fantasy series. It will always keep you at the edge of your seat‑ and the characters you will grow and fall in love with!",
				},
			])
		)
	),
];
