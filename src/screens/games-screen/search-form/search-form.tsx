import React, {
	ChangeEventHandler,
	FocusEventHandler,
	FormEventHandler,
	KeyboardEventHandler,
	useEffect,
	useState,
} from "react";
import { useHistory } from "react-router-dom";

export const handleFocus: FocusEventHandler<HTMLInputElement> = (
	event
): void => {
	event.currentTarget.select();
};

export const searchTermUrl = "query";

export const setInitialSearchTerm = (): string => {
	const searchParameters = new URLSearchParams(location.search);
	if (searchParameters.has(searchTermUrl)) {
		return searchParameters.get(searchTermUrl) as string;
	}
	return "";
};

type SearchFormProps = {
	onSearch: (searchTerm: string) => void;
};

export const SearchForm = ({ onSearch }: SearchFormProps) => {
	const [searchTerm, setSearchTerm] = useState(setInitialSearchTerm);
	const history = useHistory();

	useEffect(() => {
		if (searchTerm) {
			onSearch(searchTerm);
		}
		// perform initial search
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const doSearch = () => {
		onSearch(searchTerm);

		const searchParameters = new URLSearchParams(location.search);
		if (searchParameters.get(searchTermUrl) !== searchTerm) {
			searchParameters.set(searchTermUrl, searchTerm);
			history.replace({
				search: searchParameters.toString(),
			});
		}
	};

	const handleSearch: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		doSearch();
	};

	const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setSearchTerm(event.currentTarget.value);
	};

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
		if (event.code === "Enter") {
			event.currentTarget.blur();
			doSearch();
		}
	};

	return (
		<form className="ui form" role="search" onSubmit={handleSearch}>
			<div className="field">
				<label htmlFor="search-box">Search game</label>
				<input
					required
					type="search"
					id="search-box"
					role="searchbox"
					onKeyDown={handleKeyDown}
					onFocus={handleFocus}
					onChange={handleChange}
					value={searchTerm}
				/>
			</div>
			<button className="ui button" type="submit">
				Search
			</button>
		</form>
	);
};
