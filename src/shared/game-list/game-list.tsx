import { gameSelectors, useAppSelector } from "../../store";
import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import "./game-list.css";
import { GAME_REFERRER_KEY } from "../constants";

type GameListProps = {
	categoryFilter: number | null;
	search: string;
};

const useFilteredGames = (category: number | null, search: string) => {
	const games = useAppSelector(gameSelectors.selectAll);
	const filteredGames = useMemo(
		() =>
			games
				.filter((game) => {
					if (category !== null) {
						return game.categoryIds.includes(category);
					}
					return true;
				})
				.filter((game) =>
					search
						? game.name.toLowerCase().includes(search.toLowerCase()) ||
						  game.description.toLowerCase().includes(search.toLowerCase())
						: true
				),
		[category, games, search]
	);

	return filteredGames;
};

export const GameList = ({ categoryFilter, search }: GameListProps) => {
	const games = useFilteredGames(categoryFilter, search);
	const location = useLocation();

	return (
		<section>
			<h3 className="ui dividing header">Games</h3>
			{search && (
				<span className="search-results-listing">
					{games.length} result{games.length !== 1 && "s"} for{" "}
					<span className="search-term">&quot;{search}&quot;</span> found
				</span>
			)}
			<div className="ui relaxed divided game items links">
				{games.map((game) => (
					<div className="game item" key={game.code}>
						<div className="ui small image">
							<img src={`/${game.icon}`} alt={game.name} />
						</div>
						<div className="content">
							<div className="header">
								<b className="name">{game.name}</b>
							</div>
							<div className="description">{game.description}</div>
							<div className="extra">
								<Link
									to={`/game/${
										game.code
									}?${GAME_REFERRER_KEY}=${encodeURIComponent(
										location.pathname + location.search
									)}`}
								>
									<button className="ui button right floated secondary inverted">
										Play
									</button>
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
