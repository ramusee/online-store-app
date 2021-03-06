import React, {FC} from 'react';
import './pagination.css';
import {createPages} from "../../../helpers/createPages";
import {useAppDispatch, useAppSelector} from "../../../store/hooks/hooks";
import {mainSlice} from "../../../store/reducers/mainSlice";

const Pagination:FC = () => {
	const {currentPage, limit} = useAppSelector(state => state.mainReducer.sorting)
	const {setCurrentPage} = mainSlice.actions;
	const dispatch = useAppDispatch()
	const productsLength = 476

	const pagesCount = Math.ceil(productsLength / limit);
	const pages: number[] = [];
	createPages(pages, pagesCount, currentPage);
	return (
		<div className="pagination">
			<ul className="page__list">
				<li className="page__item"
					onClick={() => currentPage > 1 ? dispatch(setCurrentPage( currentPage - 1)) : null}
				>❮
				</li>
				{pages.map(page => (
					<li key={page}
						className={page === currentPage ? "page__item page__item_current" : "page__item"}
						onClick={() => dispatch(setCurrentPage(page))}
					>{page}
					</li>
				))}
				<li className="page__item"
					onClick={() => dispatch(setCurrentPage(currentPage + 1))}
				>❯
				</li>
			</ul>
		</div>
	);
};

export default Pagination;