import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useQueryParameter = (name: string) => {
	const location = useLocation();
	const searchParameters = new URLSearchParams(location.search);
	const [queryParameter, setQueryParameter] = useState(
		searchParameters.get(name)
	);
	useEffect(() => {
		const searchParameters = new URLSearchParams(location.search);
		const value = searchParameters.get(name);
		setQueryParameter((current) => {
			if (current !== value) {
				return value;
			}

			return current;
		});
	}, [location.search, name]);
	return queryParameter;
};

export const useDocumentTitle = (title: string) => {
	useEffect(() => {
		document.title = title;
	}, [title]);
};
