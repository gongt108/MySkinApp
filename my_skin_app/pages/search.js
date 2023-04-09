import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export const skinTypes = [
	'Dry',
	'Combination-Dry',
	'Normal',
	'Combination-Oily',
	'Oily',
	'Acne Prone',
	'Sensitive',
];

const Search = () => {
	const router = useRouter();
	const {
		query = 'all',
		category = 'all',
		brand = 'all',
		price = 'all',
		rating = 'all',
		sort = 'featured',
		page = 1,
	} = router.query;

	const { products, countProducts, categories, brands, pages } = props;

	const filterSearch = ({
		page,
		category,
		brand,
		sort,
		min,
		max,
		searchQuery,
		price,
		rating,
	}) => {
		const { query } = router;
		if (page) query.page = page;
		if (searchQuery) query.searchQuery = searchQuery;
		if (sort) query.sort = sort;
		if (category) query.category = category;
		if (brand) query.brand = brand;
		if (price) query.price = price;
		if (rating) query.rating = rating;
		if (min) query.min ? query.min : query.min === 0 ? 0 : min;
		if (max) query.max ? query.max : query.max === 0 ? 0 : max;

		router.push({
			pathname: router.pathname,
			query: query,
		});
	};
	const categoryHandler = (e) => {
		filterSearch({ category: e.target.value });
	};
	const pageHandler = (page) => {
		filterSearch({ page });
	};
	const brandHandler = (e) => {
		filterSearch({ brand: e.target.value });
	};
	const sortHandler = (e) => {
		filterSearch({ sort: e.target.value });
	};
	const priceHandler = (e) => {
		filterSearch({ price: e.target.value });
	};
	const ratingHandler = (e) => {
		filterSearch({ rating: e.target.value });
	};

	const { state, dispatch } = useContext(Store);
	const addToCartHandler = async (product) => {
		const existItem = state.cart.cartItems.find((x) => x._id === product._id);
		const quantity = existItem ? existItem.quantity + 1 : 1;
		const { data } = await axios.get(`/api/products/${product._id}`);
		if (data.countInStock < quantity) {
			toast.error('Sorry. Product is out of stock');
			return;
		}
		dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
		router.push('/cart');
	};

	return <div>Search</div>;
};

export default Search;
