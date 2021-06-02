import { categorySelectors, useAppSelector } from "../../store";
import { Link, useRouteMatch } from "react-router-dom";

export const FILTER_CATEGORY_PARAM = "category";

export const CategoryList = () => {
	const categories = useAppSelector(categorySelectors.selectAll);
	const match = useRouteMatch();

	return (
		<section>
			<h3 className="ui dividing header">Categories</h3>
			<ul
				className="ui selection animated list category items"
				aria-label="Categories"
			>
				{categories.map((category) => (
					<li key={category.id}>
						<Link
							to={`${match.url}?${FILTER_CATEGORY_PARAM}=${category.id}`}
							className="category item"
						>
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
