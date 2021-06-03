import { screen } from "@testing-library/react";
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

describe("logout functionality", () => {
	it("connect the log out button to the /logout ajax call.", () => {
		expect.assertions(1);
		window.sessionStorage.setItem(
			SESSION_STORAGE_KEY,
			JSON.stringify(playerSession)
		);
		render(<App />);
		userEvent.click(screen.getByText(/log out/i));
		expect(window.sessionStorage.getItem(SESSION_STORAGE_KEY)).toBeNull();
	});

	it("on valid log out, transition to login screen with empty input fields.", () => {
		expect.assertions(4);
		window.sessionStorage.setItem(
			SESSION_STORAGE_KEY,
			JSON.stringify(playerSession)
		);
		render(<App />);
		userEvent.click(screen.getByText(/log out/i));
		const usernameField = screen.getByLabelText(
			/username/i
		) as HTMLInputElement;
		const passwordField = screen.getByLabelText(
			/password/i
		) as HTMLInputElement;
		expect(usernameField).toBeVisible();
		expect(passwordField).toBeVisible();
		expect(usernameField.value).toStrictEqual("");
		expect(passwordField.value).toStrictEqual("");
	});
});
