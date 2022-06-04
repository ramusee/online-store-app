import React, {FC, useState} from 'react';
import ProductItem from "./productItem/ProductItem";
import './productList.css';
import {useFetchAllProductsQuery} from "../../services/productService";
import SortPanel from "./sortPanel/SortPanel";
import SortContext from "../../Contexts/Сontext";
import {IContextOptionPanel} from "../../models/IProps";
import Pagination from "./Pagination/Pagination";
import {useAppSelector} from "../../store/hooks/hooksRedux";
import Filters from "../filters/Filters";

const ProductList: FC = () => {
	const [order, setOrder] = useState('desc');
	const {search, currentPage, limit, sort} = useAppSelector(state => state.mainReducer);
	const {data: products, error, isLoading} = useFetchAllProductsQuery({search, limit, currentPage, sort, order});

	const visible = products?.length;
	const contextValue: IContextOptionPanel = {
		visible,
		order,
		setOrder
	};

	return (<>
			<SortContext.Provider value={contextValue}>
				<SortPanel/>
			</SortContext.Provider>
			<div className="wrapper">
				<div className="product-container">
					<Filters/>
					<div className="products">
						{isLoading && <h2 className="product-list__message">Загрузка...</h2>}
						{error && <h2 className="product-list__message">Не удалось загрузить товары</h2>}
						{products?.length === 0 && <h2 className="product-list__message">Не найдено</h2>}
						{products && <ul className="product-list">{products.map(item => (
							<ProductItem key={item.id}
										 id={item.id}
										 brand={item.brand}
										 category={item.category}
										 title={item.title}
										 price={item.price}
										 img={item.img}
										 discount={item.discount}
							/>
						))}
						</ul>
						}
					</div>
				</div>
				{(visible ? visible > 10 : false) && <Pagination/>}
			</div>
		</>
	);
};

export default ProductList;