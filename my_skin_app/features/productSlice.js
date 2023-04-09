import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
	products: [],
};

// useEffect(() => {
const fetchData = async () => {
	//   setIsLoading(true);
	try {
		const { data } = await axios.get('http://localhost:8082/api/products');
		setProducts(data);
		// setTopProducts(data);
	} catch (error) {
		console.log(error.message);
	}

	//   setIsLoading(false);
};

//     fetchData();
//   }, [])

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		getProducts: {
			reducer: (state, action) => {
				// async () => {
				//   setIsLoading(true);

				axios.get('http://localhost:8082/api/products');
				// console.log(data);
				state.products = data;
				// setTopProducts(data);
			},
		},
	},
});

export const { getProducts } = productSlice.actions;

export default productSlice.reducer;
