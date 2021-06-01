import { categorySelectors, useAppSelector } from "../../store";
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

export const FILTER_CATEGORY_PARAM = "category";

export const CategoryList = () => {
	const categories = useAppSelector(categorySelectors.selectAll);
	const match = useRouteMatch();

	return (
		<section>
			<h3 className="ui dividing header">Categories</h3>
			<div className="ui selection animated list category items">
				{categories.map((category) => (
					<Link
						to={`${match.url}?${FILTER_CATEGORY_PARAM}=${category.id}`}
						className="category item"
						key={category.id}
					>
						<div className="content">
							<div className="header">{category.name}</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
};
