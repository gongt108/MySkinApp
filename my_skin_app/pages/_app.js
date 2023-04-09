import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from '../store';
import { Layout } from '../components';
import { PersistGate } from 'redux-persist/integration/react';
import { wrapper } from '../store';
import axios from 'axios';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const { data } = await axios.get('http://localhost:8082/api/products');
				setProducts(data);
			} catch (error) {
				console.log(error.message);
			}

			setIsLoading(false);
		};

		fetchData();
	}, []);

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</PersistGate>
		</Provider>
	);
}

export default MyApp;
