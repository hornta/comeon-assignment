import { ReactElement } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, MemoryRouterProps, Route } from "react-router-dom";
import { makeStore } from "./store";
import { Store } from "@reduxjs/toolkit";
import { Location } from "history";

interface TestProviderProps {
	children: any;
	store: Store;
	routerProps?: MemoryRouterProps;
	onLocationChange: (location: Location<unknown>) => void;
}

const TestProvider = ({
	children,
	store,
	routerProps,
	onLocationChange,
}: TestProviderProps) => {
	return (
		<Provider store={store}>
			<MemoryRouter {...routerProps}>
				{children}
				<Route
					path="*"
					render={({ location }) => {
						onLocationChange(location);
						return null;
					}}
				/>
			</MemoryRouter>
		</Provider>
	);
};

interface CustomRenderOptions {
	testProviderProps?: Partial<TestProviderProps>;
	testingLibraryOptions?: RenderOptions;
}

type WrapperComponentProps = {
	children: any;
};

const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
	let store = options?.testProviderProps?.store;
	if (!store) {
		store = makeStore() as Store;
	}
	let testLocation: Location<unknown>;
	const wrapperComponent = ({ children, ...props }: WrapperComponentProps) => (
		<TestProvider
			{...props}
			{...options?.testProviderProps}
			store={store!}
			onLocationChange={(location) => {
				testLocation = location;
			}}
		>
			{children}
		</TestProvider>
	);
	return {
		...rtlRender(ui, {
			...options?.testingLibraryOptions,
			wrapper: wrapperComponent as React.ComponentType,
		}),
		getLocation: () => testLocation,
	};
};

export { customRender as render };
