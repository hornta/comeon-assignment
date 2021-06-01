import { createEntityAdapter, createReducer } from "@reduxjs/toolkit";
import type { Category } from "../../types";
import { loadCategories } from "./category-actions";

export const categoryAdapter = createEntityAdapter<Category>({
	selectId: (category) => category.id,
});

export const categoryReducer = createReducer(
	categoryAdapter.getInitialState(),
	(builder) => {
		builder.addCase(loadCategories.fulfilled, (state, action) => {
			categoryAdapter.setAll(state, action.payload);
		});
	}
);
