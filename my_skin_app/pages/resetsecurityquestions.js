import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
	Text,
	Image,
	Button,
	Dropdown,
	Input,
	Spacer,
} from '@nextui-org/react';
import Link from 'next/link';

import securityQuestions from '../constants/securityQuestions';
import SecurityQuestionsForm from '../components/SecurityQuestionsForm';
import { useDispatch, useSelector } from 'react-redux';
import { store, persistor, persistedReducer } from '../store';
import { setUser } from '../features/userSlice';

const ResetSecurityQuestions = (props) => {
	const savedUser = useSelector((store) => store.persistedReducer);
	const securityQuestions = savedUser.securityQuestions[0];
	const securityResponses = savedUser.securityResponses[0];

	const user = props.data.filter((user) => user._id == savedUser._id)[0];

	// console.log(user.password);
	const router = useRouter();

	const [passwordInput, setPasswordInput] = useState('');

	const [selectedQuestion, setSelectedQuestion] = useState({
		question1: securityQuestions.question1,
		question2: securityQuestions.question2,
		question3: securityQuestions.question3,
	});
	const [newResponses, setNewResponses] = useState({
		question1: '',
		question2: '',
		question3: '',
	});

	const [errorMessage, setErrorMessage] = useState('');

	function handleChange(event) {
		const { name, value } = event.target;

		setPasswordInput((prevValue) => {
			return {
				...prevValue,
				[name]: value,
			};
		});
	}

	function checkValid() {
		// console.log('checking');
		if (user.password !== passwordInput.password) {
			console.log(user.password);
			console.log(passwordInput);
			setErrorMessage("Your passwords don't match.");
		} else if (
			selectedQuestion.question1 == selectedQuestion.question2 ||
			selectedQuestion.question1 == selectedQuestion.question3 ||
			selectedQuestion.question2 == selectedQuestion.question3
		) {
			setErrorMessage('Please select unique security questions.');
		} else if (
			newResponses.question1 == '' ||
			newResponses.question2 == '' ||
			newResponses.question3 == ''
		) {
			setErrorMessage('Please input a response for your security questions.');
		} else {
			setErrorMessage('Security questions updated.');
			axios
				.put(`http://localhost:8082/api/users/${savedUser._id}`, {
					securityQuestions: selectedQuestion,
					securityResponses: newResponses,
				})
				.then((res) => {
					router.push('/profile');
				})
				.catch((err) => {
					console.log('Error in updating security questions in database.', err);
				});

			// router.push('/profile');
		}
	}

	return (
		<div className="w-[28rem] my-4 mx-8">
			<Text h1 size={30} weight="bold">
				Reset Security Questions
			</Text>
			<form
				className="flex flex-col w-[28rem] mt-2"
				// onChange={handleChange}
			>
				<Input.Password
					bordered
					label="Please Enter Your Password"
					name="password"
					placeholder="Password"
					width="28rem"
					onChange={handleChange}
				/>
				<Spacer y={1.5} />
				<SecurityQuestionsForm
					selectedQuestion={selectedQuestion}
					setSelectedQuestion={setSelectedQuestion}
					securityResponses={newResponses}
					setSecurityResponses={setNewResponses}
				/>
				<Spacer y={1.2} />
				<Text color="red">{errorMessage}</Text>
				<Spacer y={1.2} />
				<div className="flex items-center justify-between px-4">
					<Button css={{ w: '16rem' }} auto onPress={checkValid}>
						Save Changes
					</Button>
					<Link href="/profile">Cancel</Link>
				</div>
			</form>
		</div>
	);
};

export const getServerSideProps = async () => {
	const res = await axios.get('http://localhost:8082/api/users');

	return {
		props: { data: res.data },
	};
};

export default ResetSecurityQuestions;
