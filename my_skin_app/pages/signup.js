import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
	Input,
	Button,
	Text,
	Link,
	Spacer,
	Radio,
	Checkbox,
} from '@nextui-org/react';
import SecurityQuestionsForm from '../components/SecurityQuestionsForm';

import { useDispatch } from 'react-redux';
import { setUser } from '../features/userSlice';

const Signup = () => {
	const [selectedSkinType, setSelectedSkinType] = useState('');
	const [selectedSkinTypeOptional, setSelectedSkinTypeOptional] = useState([]);
	const [createdUser, setCreatedUser] = useState({
		username: '',
		password: '',
		confirmPassword: '',
	});
	const [selectedQuestion, setSelectedQuestion] = useState({
		question1: 0,
		question2: 0,
		question3: 0,
	});
	const [securityResponses, setSecurityResponses] = useState({
		question1: '',
		question2: '',
		question3: '',
	});
	const [errorMessage, setErrorMessage] = useState('');
	const [isValid, setIsValid] = useState(false);

	const router = useRouter();
	const dispatch = useDispatch();

	function handleChange(event) {
		const { name, value } = event.target;

		setCreatedUser((prevValue) => {
			return {
				...prevValue,
				[name]: value,
			};
		});
	}

	function checkValid() {
		console.log(securityResponses);
		if (selectedSkinType == '') {
			setErrorMessage('Please select a skin type.');
		} else if (createdUser.username == '' || createdUser.username.length < 8) {
			setErrorMessage('Please enter a valid username.');
		} else if (createdUser.password == '' || createdUser.password.length < 8) {
			setErrorMessage('Please enter a valid password.');
		} else if (createdUser.password != createdUser.confirmPassword) {
			setErrorMessage("Your passwords don't match.");
		} else if (
			selectedQuestion.question1 == selectedQuestion.question2 ||
			selectedQuestion.question1 == selectedQuestion.question3 ||
			selectedQuestion.question2 == selectedQuestion.question3
		) {
			setErrorMessage('Please select unique security questions.');
		} else if (
			securityResponses.question1 == '' ||
			securityResponses.question2 == '' ||
			securityResponses.question3 == ''
		) {
			setErrorMessage('Please input a response for your security questions.');
		} else {
			setErrorMessage('');
			setIsValid(true);
			axios
				.get('http://localhost:8082/api/users')
				.then((res) => {
					const allUsers = res.data;
					const foundUser = allUsers.filter(
						(user) => user.username === createdUser.username
					)[0];
					// console.log(foundUser);
					if (!foundUser) {
						saveUser();
					} else {
						setErrorMessage('This username is already taken.');
					}
				})
				.catch((err) => {
					console.log('Error in validating username.', err);
				});
		}
	}

	const saveUser = async () => {
		// console.log('run');
		// if (isValid) {
		try {
			const response = await axios
				.post('http://localhost:8082/api/users', {
					username: createdUser.username,
					password: createdUser.password,
					skinType: selectedSkinType,
					skinTypeOptional: selectedSkinTypeOptional,
					securityQuestions: selectedQuestion,
					securityResponses: securityResponses,
				})
				.then(
					// dispatch(
					// 	setUser({
					// 		isLoggedIn: true,
					// 		isGuest: false,
					// 		name: createdUser.username,
					// 		skinType: selectedSkinType,
					// 		skinTypeOptional: selectedSkinTypeOptional,
					// 		reviews: [],
					// 	})
					// )

					router.push('/login')
				);
		} catch (error) {
			console.log(error.response);
			setErrorMessage('There was an error. Please try again.');
		}
		// axios
		// 	.post('http://localhost:8082/api/users', {
		// 		username: createdUser.username,
		// 		password: createdUser.password,
		// 		skinType: selectedSkinType,
		// 		skinTypeOptional: selectedSkinTypeOptional,
		// 	})
		// 	.then(
		// 		dispatch(
		// 			setUser({
		// 				isLoggedIn: true,
		// 				isGuest: false,
		// 				name: createdUser.username,
		// 				skinType: selectedSkinType,
		// 				skinTypeOptional: selectedSkinTypeOptional,
		// 				reviews: [],
		// 			})
		// 		)
		// 	)
		// .catch((err) => {
		// 	// e.preventDefault();
		// 	console.log('Error in creating user!', err);
		// });

		// router.push('/');
		// }
	};

	return (
		<div className="mx-12 w-96 relative">
			<Text>
				Hello {createdUser.username}. Your password is {createdUser.password}.
				Skin Type: {selectedSkinType}
			</Text>
			<Text h1 size={30} weight="bold">
				Sign Up
			</Text>
			<Spacer y={0.5} />
			<form className="flex flex-col" onChange={handleChange}>
				<Input
					bordered
					label="Username"
					name="username"
					helperText={
						createdUser.username.length >= 8
							? ''
							: 'Username must be at least 8 characters long'
					}
					placeholder="Username"
				/>
				<Spacer y={1.5} />
				<Input.Password
					bordered
					label="Password"
					name="password"
					helperText={
						createdUser.password.length >= 8
							? ''
							: 'Password must be at least 8 characters long'
					}
					placeholder="Password"
				/>
				<Spacer y={1.5} />
				<Input.Password
					bordered
					label="Confirm Password"
					name="confirmPassword"
					helperText={
						createdUser.confirmPassword == createdUser.password
							? ''
							: 'Passwords must match.'
					}
					placeholder="Confirm Password"
				/>
				<Spacer y={1.5} />

				<SecurityQuestionsForm
					selectedQuestion={selectedQuestion}
					setSelectedQuestion={setSelectedQuestion}
					securityResponses={securityResponses}
					setSecurityResponses={setSecurityResponses}
				/>
				<hr />
				<Spacer y={1.5} />
				<Radio.Group
					label="Skin Type"
					value={selectedSkinType}
					onChange={setSelectedSkinType}
				>
					<Radio value="dry">Dry</Radio>
					<Radio value="combinationDry">Combination-Dry</Radio>
					<Radio value="normal">Normal</Radio>
					<Radio value="combinationOily">Combination-Oily</Radio>
					<Radio value="oily">Oily</Radio>
				</Radio.Group>
				<Spacer y={2} />
				<Checkbox.Group
					label="Other Skin Types (Optional)"
					value={selectedSkinTypeOptional}
					onChange={setSelectedSkinTypeOptional}
				>
					<Checkbox value="sensitive">Sensitive</Checkbox>
					<Checkbox value="acne-prone">Acne Prone</Checkbox>
				</Checkbox.Group>

				<Spacer y={1.2} />
				<Text color="red">{errorMessage}</Text>
				<Spacer y={1.2} />
				<Button auto onPress={checkValid}>
					Create Account
				</Button>
				<Spacer y={1.2} />
				<Link href="/">Cancel</Link>
				<Text>
					Have an Account? <Link href="/login">Log in</Link> instead.
				</Text>
			</form>
		</div>
	);
};

export default Signup;
