import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import RequestForm from './RequestForm';

// import { useStateContext } from '../context/StateContext';

const Layout = ({ children }) => {
	return (
		<div className="layout-wrapper">
			<header>
				<Navbar />
			</header>
			<main className="min-h-screen">
				{children}
				{/* <RequestForm /> */}
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
