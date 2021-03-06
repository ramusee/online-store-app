import React, {FC, useState} from 'react';
import './brandsFilter.css';
import {mainSlice} from "../../../store/reducers/mainSlice";
import {useAppDispatch, useAppSelector} from "../../../store/hooks/hooks";
import useOnclickOutside from "react-cool-onclickoutside";

const brandItems = [
	'Acer', 'Amazfit', 'Asus', 'Canon', 'Dell', 'Echips',
	'Epson', 'HP', 'Haier', 'Horizont', 'Huawei',
	'IRBIS', 'KIVI', 'Lenovo', 'MSI', 'Poco', 'Realme', 'Samsung',
	'Skyworth', 'Tecno', 'Vivo', 'Xiaomi', 'ZTE'
];

const BrandsFilter: FC = () => {
	const [isActive, setIsActive] = useState(false);
	const {brands} = useAppSelector(state => state.mainReducer.filters);
	const {changeBrands} = mainSlice.actions;
	const dispatch = useAppDispatch();

	const ref = useOnclickOutside(() => {
		setIsActive(false);
	});

	return (
		<form className="filters__brands">
			<button ref={ref}
					type="button"
					className={isActive ? "option__current rotate" : "option__current"}
					onClick={() => setIsActive(!isActive)}
			>
				Бренды
			</button>
			<div ref={ref} className={isActive ? "filter__list active-option" : "filter__list"}>
				{brandItems.map(brand => (
					<label key={brand} className="filter__item">
						<input type="checkbox"
							   value={brand}
							   checked={brands.includes(brand)}
							   onChange={() => dispatch(changeBrands(brand))}
							   className="brand__checkbox"
						/>
						{brand}
					</label>
				))}
			</div>
		</form>
	);
};

export default BrandsFilter;