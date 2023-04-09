import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import securityQuestions from '../constants/securityQuestions';
// import SecurityQuestionsForm from '../components/SecurityQuestionsForm';
import { useDispatch, useSelector } from 'react-redux';
import { store, persistor, persistedReducer } from '../store';
// import { setUser } from '../features/userSlice';

import {
	Input,
	Button,
	Text,
	Link,
	Spacer,
	Radio,
	Checkbox,
} from '@nextui-org/react';

const PasswordReset = () => {
	const savedUser = useSelector((store) => store.persistedReducer);
	const securityResponses = savedUser.securityResponses[0];
	console.log(savedUser);
	const router = useRouter();

	const [newPassword, setNewPassword] = useState({
		password: '',
		confirmPassword: '',
		question1: '',
		question2: '',
		question3: '',
	});

	// const [verificationResponses, setVerificationResponses] = useState({
	// 	question1: '',
	// 	question2: '',
	// 	question3: '',
	// });

	const [errorMessage, setErrorMessage] = useState('');

	function handleChange(event) {
		const { name, value } = event.target;

		setNewPassword((prevValue) => {
			return {
				...prevValue,
				[name]: value,
			};
		});
	}

	function checkValid() {
		console.log(securityResponses);
		if (newPassword.password == '' || newPassword.password.length < 8) {
			setErrorMessage('Please enter a valid password.');
		} else if (newPassword.password !== newPassword.confirmPassword) {
			setErrorMessage("Your passwords don't match.");
		} else if (
			newPassword.question1 != securityResponses.question1 ||
			newPassword.question2 != securityResponses.question2 ||
			newPassword.question3 != securityResponses.question3
		) {
			setErrorMessage('Please check your responses.');
		} else {
			setErrorMessage('Password changed');
			axios
				.put(`http://localhost:8082/api/users/${savedUser._id}`, {
					password: newPassword.password,
				})
				.then((res) => {
					router.push('/profile');
				})
				.catch((err) => {
					console.log('Error in changing password in database.', err);
				});

			// router.push('/profile');
		}
	}

	return (
		<div className="w-[28rem] my-4 mx-8">
			<Text h1 size={30} weight="bold">
				Reset Password
			</Text>
			<form className="flex flex-col w-[28rem] mt-2" onChange={handleChange}>
				<Input.Password
					bordered
					label="New Password"
					name="password"
					helperText={
						newPassword.password.length >= 8
							? ''
							: 'Password must be at least 8 characters long'
					}
					placeholder="Password"
					width="28rem"
				/>
				<Spacer y={1.5} />
				<Input.Password
					bordered
					label="Confirm New Password"
					name="confirmPassword"
					helperText={
						newPassword.confirmPassword == newPassword.password
							? ''
							: 'Passwords must match.'
					}
					placeholder="Confirm Password"
					width="28rem"
				/>
				<Spacer y={1.5} />
				<div>
					<div className="flex">
						<Text>Question 1: </Text>
						<Spacer x={0.5} />
						<Text>
							{securityQuestions[savedUser.securityQuestions[0].question1]}
						</Text>
					</div>
					<Spacer y={0.5} />

					<Input
						bordered
						// label="New Password"
						name="question1"
						placeholder="Answer to Security Question 1"
						width="28rem"
					/>
				</div>
				<Spacer y={1} />

				<div>
					<div className="flex">
						<Text>Question 2: </Text>
						<Spacer x={0.5} />

						<Text>
							{securityQuestions[savedUser.securityQuestions[0].question2]}
						</Text>
					</div>
					<Spacer y={0.5} />

					<Input
						bordered
						// label="New Password"
						name="question2"
						placeholder="Answer to Security Question 2"
						width="28rem"
					/>
				</div>
				<Spacer y={1} />

				<div>
					<div className="flex">
						<Text>Question 3: </Text>
						<Spacer x={0.5} />

						<Text>
							{securityQuestions[savedUser.securityQuestions[0].question3]}
						</Text>
					</div>
					<Spacer y={0.5} />

					<Input
						bordered
						// label="New Password"
						name="question3"
						placeholder="Answer to Security Question 3"
						width="28rem"
					/>
				</div>
				<Spacer y={1.2} />
				<Text color="red">{errorMessage}</Text>
				<Spacer y={1.2} />
				<div className="flex justify-between px-4">
					<Button css={{ w: '16rem' }} auto onPress={checkValid}>
						Change Password
					</Button>
					<Link href="/profile">Cancel</Link>
				</div>
			</form>
		</div>
	);
};

export default PasswordReset;
