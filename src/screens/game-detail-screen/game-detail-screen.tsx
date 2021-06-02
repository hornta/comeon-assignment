import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GAME_REFERRER_KEY } from "../../shared/constants";
import { GameLaunch } from "../../shared/game-launch/game-launch";
import { useDocumentTitle, useQueryParameter } from "../../shared/utils";
import { gameSelectors, useAppDispatch, useAppSelector } from "../../store";
import { loadGame } from "./game-detail-actions";

export const GameDetailScreen = () => {
	const { code } = useParams<{ code: string }>();

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(loadGame(code));
	}, [dispatch, code]);

	const game = useAppSelector((state) => gameSelectors.selectById(state, code));

	const refferer = useQueryParameter(GAME_REFERRER_KEY);

	useDocumentTitle(game?.name ?? "");

	return (
		<div className="ingame">
			<div className="ui grid centered">
				<div className="three wide column">
					<Link
						to={refferer || "/games"}
						className="ui right floated secondary button inverted"
					>
						Back
					</Link>
				</div>
				{game && (
					<div className="ten wide column">
						<GameLaunch code={game.code} />
					</div>
				)}
				<div className="three wide column"></div>
			</div>
		</div>
	);
};
