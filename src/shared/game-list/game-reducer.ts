import { createEntityAdapter, createReducer } from "@reduxjs/toolkit";
import type { Game } from "../../types";
import { loadGame } from "../../screens/game-detail-screen/game-detail-actions";
import { loadGames } from "./game-actions";

export const gameAdapter = createEntityAdapter<Game>({
	selectId: (game) => game.code,
});

export const gameReducer = createReducer(
	gameAdapter.getInitialState(),
	(builder) => {
		builder
			.addCase(loadGames.fulfilled, (state, action) => {
				gameAdapter.setAll(state, action.payload);
			})
			.addCase(loadGame.fulfilled, (state, action) => {
				gameAdapter.addOne(state, action.payload);
			});
	}
);
