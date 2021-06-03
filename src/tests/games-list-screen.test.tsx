import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../app/app";
import { SESSION_STORAGE_KEY } from "../shared/constants";
import { render } from "../test-utils";
import { Player } from "../types";

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
		const categorySection = screen.getByLabelText(/categories/i);
		const list = within(categorySection).getByRole("list");
		expect(await within(list).findAllByRole("listitem")).toHaveLength(3);
	});

	it("provide functionality for filtering by typing.", async () => {
		expect.assertions(2);
		sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(playerSession));
		render(<App />);
		userEvent.type(screen.getByRole("searchbox"), "dead or alive");
		userEvent.click(screen.getByRole("button", { name: /search/i }));
		const gameSection = screen.getByLabelText(/games/i);
		const list = within(gameSection).getByRole("list");
		const listItems = await within(list).findAllByRole("listitem");
		expect(listItems).toHaveLength(1);
		expect(within(listItems[0]).getByText(/dead or alive/i)).toBeVisible();
	});

	it("provide functionality to filter by category.", async () => {
		expect.assertions(5);
		sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(playerSession));
		render(<App />);

		const gameSection = screen.getByLabelText(/games/i);
		const gameList = within(gameSection).getByRole("list");
		expect(await within(gameList).findAllByRole("listitem")).toHaveLength(5);

		userEvent.click(await screen.findByRole("link", { name: /video slots/i }));
		expect(within(gameList).getAllByRole("listitem")).toHaveLength(3);

		const listItems = within(gameList).getAllByRole("listitem");

		const firstItem = within(listItems[0]).getByText(/^jack hammer$/i);
		expect(firstItem).toBeVisible();

		const secondItem = within(listItems[1]).getByText(
			/^jack and the beanstalk$/i
		);
		expect(secondItem).toBeVisible();

		const thirdItem = within(listItems[2]).getByText(/^twin spin$/i);
		expect(thirdItem).toBeVisible();
	});

	it("make it possible to start a game by clicking on the play icon.", async () => {
		expect.assertions(2);
		sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(playerSession));
		render(<App />);

		const gameSection = screen.getByLabelText(/games/i);
		const gameList = within(gameSection).getByRole("list");
		const listItems = await within(gameList).findAllByRole("listitem");
		const button = within(listItems[0]).getByRole("button", {
			name: /play/i,
		});
		expect(button).toBeVisible();
		userEvent.click(button);
		expect(screen.getByTestId("game-launcher")).toBeVisible();
	});
});
