import React, { ReactElement } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { makeStore } from "./store";
import { Store } from "@reduxjs/toolkit";

interface TestProviderProps {
	children: ReactElement;
	store: Store;
}
const TestProvider = ({ children, store }: TestProviderProps) => {
	return (
		<Provider store={store}>
			<MemoryRouter>{children}</MemoryRouter>
		</Provider>
	);
};

interface CustomRenderOptions {
	testProviderProps?: TestProviderProps;
	testingLibraryOptions?: RenderOptions;
}
const customRender = (ui: ReactElement, options: CustomRenderOptions) => {
	let store = options?.testProviderProps;
	if (!store) {
		store = makeStore();
	}
	rtlRender(ui, {
		wrapper: (props: any) => (
			<TestProvider {...options?.testProviderProps} store={store} />
		),
		...options?.testingLibraryOptions,
	});
};

export * from "@testing-library/react";

export { customRender as render };
