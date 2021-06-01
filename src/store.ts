import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
	categoryAdapter,
	categoryReducer,
} from "./shared/category-list/category-reducer";
import { gameAdapter, gameReducer } from "./shared/game-list/game-reducer";
import { loginReducer } from "./screens/login-screen/login-reducer";
import { sessionMiddleware } from "./shared/session/session-middleware";
import { sessionReducer } from "./shared/session/session-reducer";

export const makeStore = () => {
	const store = configureStore({
		reducer: {
			login: loginReducer,
			session: sessionReducer,
			categories: categoryReducer,
			games: gameReducer,
		},
		middleware: (getDefaultMiddleware) =>
			// https://redux-toolkit.js.org/api/getDefaultMiddleware#intended-usage
			// eslint-disable-next-line unicorn/prefer-spread
			getDefaultMiddleware().concat(sessionMiddleware),
	});
	return store;
};

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const gameSelectors = gameAdapter.getSelectors<RootState>(
	(state) => state.games
);
export const categorySelectors = categoryAdapter.getSelectors<RootState>(
	(state) => state.categories
);
