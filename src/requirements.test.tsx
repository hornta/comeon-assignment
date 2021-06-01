import React from "react";
import { LoginScreen } from "./screens/login-screen/login-screen";
import { render } from "./test-utils";

describe("Requirements", () => {
	describe("Login functionality", () => {
		it("Connect the login form to the /login ajax call.", () => {
			render(<LoginScreen />);

			// https://github.com/testing-library/react-testing-library
			// test that I can see a logout button
			// test that local storage has saved the player
		});
		it("On valid username/password, transition to the games list screen.", () => {
			// test it redirects to games list screen
		});
		it("On invalid username/password, provide feedback and allow to try again.", () => {
			// test that I can see the error message upon incorrect details
		});
	});

	describe("Logout functionality", () => {
		it("Connect the log out button to the /logout ajax call.", () => {
			// test that I can see a login button
			// test local storage doesn't contain any player
		});
		it("On valid log out, transition to login screen with empty input fields.", () => {
			// test it transitions to login screen
			// test that username and password fields are empty
		});
	});

	describe("Games list screen", () => {
		it("Requires user to be logged in", () => {});
		it("List categories from /categories ajax call.", () => {});
		it("Provide functionality for filtering by typing.", () => {});
		it("Provide functionality to filter by category.", () => {});
		it("Make it possible to start a game by clicking on the play icon.", () => {});
	});

	describe("Game play screen", () => {
		it("Requires user to be logged in", () => {});
		it("Load the selected game via the provided API", () => {});
		it("Provide a way to go back to the Games list screen", () => {});
	});
});
