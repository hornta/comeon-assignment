import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../app/app";
import { SESSION_STORAGE_KEY } from "../shared/constants";
import { games } from "../shared/game-launch/game-launch";
import { render } from "../test-utils";
import { Player } from "../types";

const playerSession: Player = {
	avatar: "",
	event: "",
	name: "",
	password: "",
};

describe("game play screen", () => {
	const renderOptions = {
		testProviderProps: {
			routerProps: {
				initialEntries: ["/game/twinspin"],
			},
		},
	};

	it("requires user to be logged in", async () => {
		expect.assertions(2);

		// unauthorized
		render(<App />, renderOptions);
		expect(screen.getByLabelText(/username/i)).toBeVisible();

		// authorized
		sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(playerSession));
		render(<App />, renderOptions);
		expect(await screen.findByTestId("game-launcher")).toBeVisible();
	});

	it("load the selected game via the provided API", async () => {
		expect.assertions(2);
		sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(playerSession));
		render(<App />, renderOptions);
		const gameLauncher = (await screen.findByTestId(
			"game-launcher"
		)) as HTMLIFrameElement;
		expect(gameLauncher).toBeVisible();
		expect(gameLauncher.src).toStrictEqual(games.twinspin);
	});

	it("provide a way to go back to the Games list screen", () => {
		expect.assertions(2);
		sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(playerSession));
		const { getLocation } = render(<App />, renderOptions);

		const backButton = screen.getByRole("link", { name: /back/i });
		expect(backButton).toBeVisible();
		userEvent.click(backButton);

		expect(getLocation().pathname).toStrictEqual("/games");
	});
});
