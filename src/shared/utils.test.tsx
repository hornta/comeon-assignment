import { renderHook } from "@testing-library/react-hooks";
import { createMemoryHistory } from "history";
import { FC } from "react";
import {
	Router,
	RouterProps,
	Redirect,
	MemoryRouter,
	MemoryRouterProps,
} from "react-router-dom";
import { useQueryParameter } from "./utils";

type WrapperProps = RouterProps;

describe("utils", () => {
	it("should use a query parameter", () => {
		expect.assertions(1);
		const wrapper: FC<WrapperProps> = ({ children, history }) => (
			<Router history={history}>{children}</Router>
		);
		const { result } = renderHook(() => useQueryParameter("foo"), {
			wrapper,
			initialProps: {
				history: createMemoryHistory({
					initialEntries: [{ search: "?foo=bar" }],
				}),
			},
		});
		expect(result.current).toBe("bar");
	});

	it("should throw when used outside a react router context", () => {
		expect.assertions(1);
		const { result } = renderHook(() => useQueryParameter("foo"));
		expect(result.error).toBeInstanceOf(Error);
	});

	it("should not accept an empty string", () => {
		expect.assertions(1);
		const { result } = renderHook(() => useQueryParameter(""));

		expect(result.error).toStrictEqual(
			TypeError("empty string passed to useQueryParameter")
		);
	});

	// look into fixing this test
	// eslint-disable-next-line jest/no-disabled-tests
	it.skip("should handle changes to location.search", () => {
		expect.assertions(2);

		const history = createMemoryHistory({
			initialEntries: [{ search: "?foo=first" }],
		});

		interface CustomWrapperProps extends WrapperProps {
			redirect: boolean;
		}

		const wrapper: FC<CustomWrapperProps> = ({
			children,
			redirect,
			history,
		}) => (
			<Router history={history}>
				{children}
				{redirect && (
					<Redirect from="?foo=first" to={{ search: "?foo=second" }} />
				)}
			</Router>
		);
		const { result } = renderHook(() => useQueryParameter("foo"), {
			wrapper,
			initialProps: {
				history,
			},
		});
		expect(result.current).toBe("first");

		history.push({ search: "?foo=second" });

		expect(result.current).toBe("second");
	});

	it("handle prop changes", () => {
		expect.assertions(2);

		let initialValue = "foo";
		const wrapper: FC<MemoryRouterProps> = ({ children, initialEntries }) => (
			<MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
		);
		const { result, rerender } = renderHook(
			() => useQueryParameter(initialValue),
			{
				wrapper,
				initialProps: {
					initialEntries: [{ search: "?foo=bar&search=spiderman" }],
				},
			}
		);
		expect(result.current).toBe("bar");

		initialValue = "search";
		rerender();

		expect(result.current).toBe("spiderman");
	});
});
