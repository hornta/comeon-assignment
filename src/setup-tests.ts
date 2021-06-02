import "@testing-library/jest-dom";
import "jest-localstorage-mock";
import { server } from "./mocks/server";

// eslint-disable-next-line jest/no-hooks, jest/require-top-level-describe
beforeAll(() => {
	server.listen();
});

// eslint-disable-next-line jest/no-hooks, jest/require-top-level-describe
beforeEach(() => {
	localStorage.clear();
	sessionStorage.clear();
	jest.clearAllMocks();
});

// eslint-disable-next-line jest/no-hooks, jest/require-top-level-describe
afterEach(() => {
	server.resetHandlers();
});

// eslint-disable-next-line jest/no-hooks, jest/require-top-level-describe
afterAll(() => {
	server.close();
});
