import { getAllByRole, screen, within } from "@testing-library/react";
import { App } from "../app/app";
import { SESSION_STORAGE_KEY } from "../shared/constants";
import { render } from "../test-utils";

const playerSession: Player = {
	avatar: "",
	event: "",
	name: "",
	password: "",
};

describe("games list screen", () => {
	it("requires user to be logged in", () => {
		expect.assertions(3);
		const renderOptions = {
			testProviderProps: {
				routerProps: {
					initialEntries: ["/games"],
				},
			},
		};

		// logged out
		render(<App />, renderOptions);
		expect(screen.getByLabelText(/username/i)).toBeVisible();

		// logged in
		sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(playerSession));
		render(<App />, renderOptions);
		expect(screen.getByText(/games/i)).toBeVisible();
		expect(screen.getByText(/categories/i)).toBeVisible();
	});

	it("list categories from /categories ajax call.", async () => {
		expect.assertions(1);
		sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(playerSession));
		render(<App />);
		const list = screen.getByRole("list", { name: /categories/i });
		expect(await within(list).findAllByRole("listitem")).toHaveLength(3);
	});

	it.todo("provide functionality for filtering by typing.");

	it.todo("provide functionality to filter by category.");

	it.todo("make it possible to start a game by clicking on the play icon.");
});
