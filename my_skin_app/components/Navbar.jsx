import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Dropdown, Input, Button } from '@nextui-org/react';
import {
	AiOutlineFacebook,
	AiOutlineInstagram,
	AiOutlineTwitter,
	AiOutlineUser,
} from 'react-icons/ai';
// import { setUser, logoutUser } from "../features/userSlice";
import { store, persistor, persistedReducer } from '../store';
import RequestForm from './RequestForm';
import axios from 'axios';
import { skinTypes } from '../pages/products';

const Navbar = () => {
	const [currentUsername, setCurrentUser] = useState('');
	const [visible, setVisible] = React.useState(false);
	const [query, setQuery] = useState('');

	const dispatch = useDispatch();
	const router = useRouter();
	const savedUsername = useSelector((store) => store.persistedReducer.name);
	// const skinTypes = [
	// 	'Dry',
	// 	'Combination-Dry',
	// 	'Normal',
	// 	'Combination-Oily',
	// 	'Oily',
	// 	'Acne Prone',
	// 	'Sensitive',
	// ];

	useEffect(() => {
		setCurrentUser(savedUsername);
	}, [savedUsername]);

	function navigateToScreen(key) {
		router.push(`/${key}`);
	}

	function handleChange(event) {
		setQuery(event.target.value);
		// console.log(query);
	}

	function searchProduct(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			router.push(`/products?searchQuery=${query}`);
		}
	}

	const openHandler = () => {
		setVisible(true);
	};

	const closeHandler = () => {
		setVisible(false);
	};

	return (
		<div className="navbar-container bg-gray-200 w-screen flex flex-col">
			<RequestForm
				visible={visible}
				openHandler={openHandler}
				closeHandler={closeHandler}
			/>
			<div className="navbar-wrapper">
				<div className="logo flex w-auto flex-row justify-between p-4">
					<p className="flex">
						<Link className="my-auto" href="/">
							MySkinApp
						</Link>
					</p>
					<form className="mx-4 flex flex-1" onChange={handleChange}>
						<Input
							className="rounded-md my-auto"
							fullWidth="true"
							placeholder="Search"
							name="searchQuery"
							onKeyDown={(e) => searchProduct(e)}
						/>
					</form>

					<Dropdown>
						<Dropdown.Trigger
							flat="true"
							data-dropdown-toggle="dropdownHover"
							data-dropdown-trigger="hover"
							className="hover:bg-gray-300 rounded p-4 flex hover:underline underline-offset-4"
						>
							<div>
								<AiOutlineUser size={24} className="mr-2" />
								<Text className="">
									{currentUsername == ''
										? 'Sign in'
										: `Hello ${currentUsername}`}
								</Text>
							</div>
						</Dropdown.Trigger>

						{currentUsername == '' ? (
							<Dropdown.Menu
								className="flex flex-col bg-white w-36 rounded"
								onAction={(key) => navigateToScreen(key)}
							>
								<Dropdown.Item key="login" textValue="login">
									<Text>Login</Text>
								</Dropdown.Item>
							</Dropdown.Menu>
						) : (
							<Dropdown.Menu
								className="flex flex-col bg-white w-36 rounded"
								onAction={(key) => navigateToScreen(key)}
							>
								<Dropdown.Item key="profile" textValue="My Account">
									<Text>My Account</Text>
								</Dropdown.Item>
								<Dropdown.Item key="logout" textValue="logout">
									<Text>Logout</Text>
								</Dropdown.Item>
							</Dropdown.Menu>
						)}
					</Dropdown>
				</div>
				<div className="navbar-links flex px-8 mt-2 py-2 items-center bg-gray-300 justify-between">
					<div className="navbar-links flex space-x-4">
						<Link className="navbar-link" href="/">
							HOME
						</Link>
						<Link className="navbar-link" href="/brands">
							BRANDS
						</Link>
						<Dropdown>
							<Dropdown.Trigger
								data-dropdown-toggle="dropdownHover"
								data-dropdown-trigger="hover"
								className="hover:underline underline-offset-4"
							>
								<Text>SKIN TYPES</Text>
							</Dropdown.Trigger>
							<Dropdown.Menu>
								{skinTypes.map((item, index) => (
									<Dropdown.Item key={item} textValue="item" onAction>
										<Text>{item}</Text>
									</Dropdown.Item>
								))}
							</Dropdown.Menu>
						</Dropdown>
						<Link className="navbar-link" href="/products">
							ALL PRODUCTS
						</Link>

						{currentUsername != '' && (
							<Link className="navbar-link" href="/favorites">
								FAVORITES
							</Link>
						)}
					</div>

					<button
						// flat
						// light
						className="navbar-link bg-gray-300 font-bold justify-right"
						onClick={openHandler}
					>
						Not Seeing a Product?
					</button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
