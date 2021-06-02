import { ComponentType, ReactElement } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";
import { makeStore } from "./store";
import { Store } from "@reduxjs/toolkit";

interface TestProviderProps {
	children: any;
	store: Store;
	routerProps?: MemoryRouterProps;
}

const TestProvider = ({ children, store, routerProps }: TestProviderProps) => {
	return (
		<Provider store={store}>
			<MemoryRouter {...routerProps}>{children}</MemoryRouter>
		</Provider>
	);
};

interface CustomRenderOptions {
	testProviderProps?: TestProviderProps;
	testingLibraryOptions?: RenderOptions;
}

type WrapperComponentProps = {
	children: any;
};

const customRender = (ui: ReactElement, options: CustomRenderOptions) => {
	let store = options?.testProviderProps?.store;
	if (!store) {
		store = makeStore() as Store;
	}
	const wrapperComponent = ({ children, ...props }: WrapperComponentProps) => (
		<TestProvider {...props} {...options?.testProviderProps} store={store!}>
			{children}
		</TestProvider>
	);
	return rtlRender(ui, {
		...options?.testingLibraryOptions,
		wrapper: wrapperComponent as React.ComponentType,
	});
};

export { customRender as render };
