import React, {FC, useState} from 'react';
import './productItem.css';
import {IProduct} from "../../../models/interfaces";
import {categoryRu} from "../../../helpers/RuHelpers/RuObjects";
import {mainSlice} from "../../../store/reducers/mainSlice";
import {useAppDispatch, useAppSelector} from "../../../store/hooks/hooks";
import CountChanger from "./countChanger/CountChanger";

const ProductItem: FC<IProduct> = ({
									   id,
									   title,
									   brand,
									   category,
									   price,
									   img,
									   discount,
									   description,
									   item,
								   }) => {
	const [isOpenDesc, setIsOpenDesc] = useState(false);
	const {addCartProducts} = mainSlice.actions;
	const {cartProducts} = useAppSelector(state => state.mainReducer.cart);
	const dispatch = useAppDispatch();
	let isInCart = false
	const priceWithDiscount = Math.round(price - (price / 100 * discount))

	const productDescription = Object.entries(description).map(([key, value]) => {
		return <div key={key} className={isOpenDesc ? "product__desc desc-open" : "product__desc"}>
			{key}{value}
		</div>;
	});

	cartProducts.forEach(cartProduct => {
		if (cartProduct.id === id) {
			isInCart = true
		}
	})

	const handleCartBtn = (item: IProduct) => {
		if (!cartProducts.includes(item)) {
			dispatch(addCartProducts(item));
		}
	};

	return (
		<li className="product__item">
			<div className="product__left-container">
				<div className="product__image-container">
					<img className="product__image"
						 src={img}
						 alt="product image"/>
				</div>
				<div className="product__options">
					<span className="product__title">{title}</span>
					<span className="product__category">Тип: {categoryRu[category]}</span>
					<span className="product__brand">Бренд: {brand}</span>
					<button onClick={() => setIsOpenDesc(!isOpenDesc)}
							className={!isOpenDesc ? "product__desc_btn" : "product__desc_btn rotate"}
					>
						Характеристики:
					</button>
					{isOpenDesc && productDescription}
					<span className="product__article">Article: {id + 1}</span>
				</div>
			</div>
			<div className="product__right-container">
				<div className="product__price-container">
					<span className="product__price">{priceWithDiscount} ₽</span>
					{!!discount && <span className="product__price_prev">
					{Math.round(price)} ₽</span>}
					{!!discount && <span className="product__discount">−{discount}%</span>}
				</div>
				{!isInCart && <button className="blue-btn"
											 onClick={() => {
												 handleCartBtn(item);
											 }}
				>В корзину</button>}
				{isInCart && <CountChanger id={id}/>}
			</div>
		</li>
	);
};
// <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
// 	<path d="M11.5834 16.8334C12.1359 16.8334 12.6658 16.6139 13.0565 16.2232C13.4472 15.8325 13.6667 15.3026 13.6667 14.75C13.6667 14.1975 13.4472 13.6676 13.0565 13.2769C12.6658 12.8862 12.1359 12.6667 11.5834 12.6667C11.0308 12.6667 10.5009 12.8862 10.1102 13.2769C9.71951 13.6676 9.50002 14.1975 9.50002 14.75C9.50002 15.3026 9.71951 15.8325 10.1102 16.2232C10.5009 16.6139 11.0308 16.8334 11.5834 16.8334ZM4.29168 16.8334C4.84422 16.8334 5.37412 16.6139 5.76482 16.2232C6.15552 15.8325 6.37502 15.3026 6.37502 14.75C6.37502 14.1975 6.15552 13.6676 5.76482 13.2769C5.37412 12.8862 4.84422 12.6667 4.29168 12.6667C3.73915 12.6667 3.20925 12.8862 2.81854 13.2769C2.42784 13.6676 2.20835 14.1975 2.20835 14.75C2.20835 15.3026 2.42784 15.8325 2.81854 16.2232C3.20925 16.6139 3.73915 16.8334 4.29168 16.8334ZM17.8729 2.16981C18.133 2.16142 18.3796 2.05223 18.5605 1.86531C18.7415 1.6784 18.8427 1.42842 18.8427 1.16825C18.8427 0.908074 18.7415 0.658098 18.5605 0.471184C18.3796 0.284271 18.133 0.175074 17.8729 0.166687H16.674C15.7344 0.166687 14.9219 0.81877 14.7177 1.73544L13.4125 7.61252C13.2083 8.52919 12.3959 9.18127 11.4563 9.18127H3.63127L2.12918 3.17085H11.8636C12.1212 3.1591 12.3643 3.0485 12.5424 2.86205C12.7206 2.67561 12.82 2.42767 12.82 2.16981C12.82 1.91195 12.7206 1.66401 12.5424 1.47757C12.3643 1.29113 12.1212 1.18052 11.8636 1.16877H2.12918C1.82467 1.16868 1.52414 1.23802 1.25045 1.37151C0.976754 1.50501 0.7371 1.69915 0.549702 1.93917C0.362303 2.17919 0.232094 2.45878 0.168973 2.75668C0.105853 3.05458 0.111483 3.36295 0.185434 3.65835L1.68752 9.66669C1.7958 10.1002 2.04594 10.4851 2.39815 10.7601C2.75036 11.0351 3.18441 11.1845 3.63127 11.1844H11.4563C12.3679 11.1845 13.2524 10.8737 13.9635 10.3032C14.6747 9.73281 15.17 8.93687 15.3677 8.04689L16.674 2.16981H17.8729Z"/>
// </svg>
export default ProductItem;