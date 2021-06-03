import { categorySelectors, useAppSelector } from "../../store";
import { Link, useRouteMatch } from "react-router-dom";

export const FILTER_CATEGORY_PARAM = "category";

export const CategoryList = () => {
	const categories = useAppSelector(categorySelectors.selectAll);
	const match = useRouteMatch();

	return (
		<section aria-labelledby="categories">
			<header>
				<h3 className="ui dividing header" id="categories">
					Categories
				</h3>
			</header>
			<ul className="ui selection animated list category">
				{categories.map((category) => (
					<li key={category.id} className="category item">
						<Link to={`${match.url}?${FILTER_CATEGORY_PARAM}=${category.id}`}>
							<div className="content">
								<div className="header">{category.name}</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};
