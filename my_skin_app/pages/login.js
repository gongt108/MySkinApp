import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { setUser } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Text, Link, Spacer } from '@nextui-org/react';

const Login = () => {
	const [isGuest, setIsGuest] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const [inputtedUser, setInputtedUser] = useState({
		username: '',
		password: '',
	});
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const router = useRouter();

	function doNotLogin() {
		setIsGuest(true);
	}

	function handleChange(event) {
		const { name, value } = event.target;

		setInputtedUser((prevValue) => {
			return {
				...prevValue,
				[name]: value,
			};
		});
	}

	function findUser() {
		axios
			.get('http://localhost:8082/api/users')
			.then((res) => {
				const allUsers = res.data;
				const foundUser = allUsers.filter(
					(user) =>
						user.username === inputtedUser.username &&
						user.password === inputtedUser.password
				)[0];
				// console.log(foundUser.username);
				if (foundUser) {
					// console.log(foundUser);
					dispatch(
						setUser({
							isLoggedIn: true,
							isGuest: false,
							_id: foundUser._id,
							name: foundUser.username,
							securityQuestions: foundUser.securityQuestions,
							securityResponses: foundUser.securityResponses,

							skinType: foundUser.skinType,
							skinTypeOptional: foundUser.skinTypeOptional,
							reviews: foundUser.reviews,
						})
					);

					router.push('/');
				}
			})
			.catch((err) => {
				console.log('Could not complete action.');
			});
	}

	function checkInput() {
		if (user.username == 'admin' && user.password == 'admin') {
			setIsLoggedIn(true);
			setIsGuest(false);
		}
	}

	return (
		<div className="w-96 relative">
			<Text>Guest: {isGuest.toString()}</Text>
			<Text>Logged In: {isLoggedIn.toString()}</Text>
			<Text>
				Hello {inputtedUser.username}. Your password is {inputtedUser.password}.
			</Text>
			<Button light auto onPress={doNotLogin}>
				X
			</Button>
			<Text h1 size={30} weight="bold">
				Login
			</Text>
			<Spacer y={0.5} />
			<form className="flex flex-col" onChange={handleChange}>
				<Input
					clearable
					bordered
					label="Username"
					name="username"
					placeholder="Username"
				/>
				<Spacer y={0.8} />
				<Input.Password
					clearable
					bordered
					label="Password"
					name="password"
					placeholder="Password"
				/>
				<Spacer y={1.2} />
				<Button auto onPress={findUser}>
					Login
				</Button>
				<Spacer y={1.2} />
				<Link href="/resetpassword">Forgot Password</Link>
				<Link href="/signup">Create An Account</Link>
			</form>
		</div>
	);
};

export default Login;
