import React, {FC, useState} from 'react';
import {categoryRu} from "../../../helpers/RuHelpers/RuObjects";
import {useAppDispatch, useAppSelector} from "../../../store/hooks/hooks";
import {mainSlice} from "../../../store/reducers/mainSlice";
import './categoryFilter.css'
import useOnclickOutside from "react-cool-onclickoutside";

const categoryItems = ['all', 'Laptop', 'Smartphone', 'TV', 'Monoblock', 'Printer', 'SmartWatch', 'Tablet'];

let categoryClasses = ['filter__list'];
let categoryItemClasses = ['filter__item'];

const CategoryFilter: FC = () => {
	const [isActive, setIsActive] = useState(false);
	const {filters} = useAppSelector(state => state.mainReducer);
	const {setCategory} = mainSlice.actions;
	const dispatch = useAppDispatch();
	const ref = useOnclickOutside(() => {
		setIsActive(false);
	});
	const currentCategory = filters.category;

	isActive
		? categoryClasses.push('active-option')
		: categoryClasses = categoryClasses.filter(item => item !== 'active-option');

	return (
		<div className="filters__category">
			<button className={isActive ? "option__current rotate" : "option__current"}
					ref={ref}
					onClick={() => setIsActive(!isActive)}
			>
				Категория: {categoryRu[currentCategory]}
			</button>
			<ul className={categoryClasses.join(' ')}
				ref={ref}
			>
				{categoryItems.map(item => {
						currentCategory === item
							? categoryItemClasses.push('current-option')
							: categoryItemClasses = categoryItemClasses.filter(item => item !=='current-option')
						return (<li key={item}
									className={Array.from(categoryItemClasses).join(' ')}
									onClick={() => {
										dispatch(setCategory(item));
										setIsActive(false);
									}}
						>{categoryRu[item]}
						</li>);
					}
				)}
			</ul>
		</div>
	);
};

export default CategoryFilter;