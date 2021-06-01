import React, {
	MouseEventHandler,
	useCallback,
	useEffect,
	useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { logout } from "../../shared/session/session-actions";
import { GameList } from "../../shared/game-list/game-list";
import {
	CategoryList,
	FILTER_CATEGORY_PARAM,
} from "../../shared/category-list/category-list";
import { loadCategories } from "../../shared/category-list/category-actions";
import { loadGames } from "../../shared/game-list/game-actions";
import { useDocumentTitle, useQueryParameter } from "../../shared/utils";
import { SearchForm } from "./search-form/search-form";

export const GamesScreen = () => {
	const playerSession = useAppSelector((state) => state.session!);
	const [search, setSearch] = useState<string>("");
	const filterCategory = useQueryParameter(FILTER_CATEGORY_PARAM);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadGames());
		dispatch(loadCategories());
	}, [dispatch]);

	const handleLogout: MouseEventHandler<HTMLButtonElement> = () => {
		dispatch(logout());
	};

	const handleSearch = useCallback((searchTerm) => {
		setSearch(searchTerm);
	}, []);

	useDocumentTitle("Games");

	return (
		<>
			<div className="ui grid centered">
				<div className="twelve wide column">
					<div className="ui list">
						<div className="player item">
							<img
								className="ui avatar image"
								src={`/${playerSession.avatar}`}
								alt={playerSession.name}
							/>

							<div className="content">
								<div className="header">
									<b className="name">{playerSession.name}</b>
								</div>
								<div className="description event">{playerSession.event}</div>
							</div>
						</div>
					</div>
					<button
						className="logout ui left floated secondary button inverted"
						onClick={handleLogout}
					>
						Log Out
					</button>
				</div>
				<div className="four wide column">
					<SearchForm onSearch={handleSearch} />
				</div>
			</div>
			<div className="ui grid">
				<div className="twelve wide column">
					<GameList
						categoryFilter={filterCategory ? Number(filterCategory) : null}
						search={search}
					/>
				</div>
				<div className="four wide column">
					<CategoryList />
				</div>
			</div>
		</>
	);
};
