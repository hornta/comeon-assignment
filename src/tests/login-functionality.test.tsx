import { App } from "../app/app";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/dom";
import { API_BASE_URL, SESSION_STORAGE_KEY } from "../shared/constants";
import { server } from "../mocks/server";
import { rest } from "msw";
import { render } from "../test-utils";

const player = {
	name: "Rebecka Awesome",
	avatar: "images/avatar/rebecka.jpg",
	event: "Last seen gambling on Starburst.",
	password: "secret",
};

const setSuccessfulLoginResponse = () => {
	server.use(
		rest.post("/login", async (request, response, context) => {
			return response(
				context.status(200),
				context.json({
					status: "success",
					player,
				})
			);
		})
	);
};

describe("login functionality", () => {
	it("connect the login form to the /login ajax call.", async () => {
		expect.assertions(2);
		setSuccessfulLoginResponse();
		render(<App />);
		userEvent.type(screen.getByLabelText(/username/i), "myusername");
		userEvent.type(screen.getByLabelText(/password/i), "mypassword");
		userEvent.click(screen.getByText(/login/i));
		await waitFor(() => {
			expect(screen.getByText(/log out/i)).toBeVisible();
		});

		expect(window.sessionStorage.getItem(SESSION_STORAGE_KEY)).toStrictEqual(
			JSON.stringify(player)
		);
	});

	it("on valid username/password, transition to the games list screen.", async () => {
		expect.assertions(2);
		setSuccessfulLoginResponse();
		render(<App />);
		userEvent.type(screen.getByLabelText(/username/i), "myusername");
		userEvent.type(screen.getByLabelText(/password/i), "mypassword");
		userEvent.click(screen.getByText(/login/i));
		await waitFor(() => {
			expect(screen.getByText(/games/i)).toBeVisible();
			expect(screen.getByText(/categories/i)).toBeVisible();
		});
	});

	it("on invalid username/password, provide feedback and allow to try again.", async () => {
		expect.assertions(2);
		server.use(
			rest.post(`${API_BASE_URL}/login`, async (request, response, context) => {
				return response(
					context.status(400),
					context.json({
						status: "fail",
						error: "incorrect username or password",
					})
				);
			})
		);
		render(<App />);
		userEvent.type(screen.getByLabelText(/username/i), "badusername");
		userEvent.type(screen.getByLabelText(/password/i), "badpassword");
		userEvent.click(screen.getByText(/login/i));
		await waitFor(() => {
			expect(screen.getByText(/incorrect username or password/i)).toBeVisible();
		});

		setSuccessfulLoginResponse();
		userEvent.type(screen.getByLabelText(/username/i), "goodusername");
		userEvent.type(screen.getByLabelText(/password/i), "goodpassword");
		userEvent.click(screen.getByText(/login/i));
		await waitFor(() => {
			expect(
				screen.queryByText(/incorrect username or password/i)
			).not.toBeInTheDocument();
		});
	});
});
