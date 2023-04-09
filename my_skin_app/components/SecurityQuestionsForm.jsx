import React, { useState } from 'react';
import securityQuestions from '../constants/securityQuestions';
import { Input, Button, Text, Spacer, Dropdown } from '@nextui-org/react';

const SecurityQuestionsForm = (props) => {
	const [selectedQuestion, setSelectedQuestion] = useState({
		question1: 0,
		question2: 0,
		question3: 0,
	});
	// const [securityResponses, setSecurityResponses] = useState({
	// 	question1: '',
	// 	question2: '',
	// 	question3: '',
	// });
	const [errorMessage, setErrorMessage] = useState('');

	function handleChange(event) {
		const { name, value } = event.target;

		props.setSecurityResponses((prevValue) => {
			return {
				...prevValue,
				[name]: value,
			};
		});
	}

	function setQuestion1(key) {
		props.setSelectedQuestion((prevValue) => {
			return {
				...prevValue,
				question1: key,
			};
		});
	}
	function setQuestion2(key) {
		props.setSelectedQuestion((prevValue) => {
			return {
				...prevValue,
				question2: key,
			};
		});
	}
	function setQuestion3(key) {
		props.setSelectedQuestion((prevValue) => {
			return {
				...prevValue,
				question3: key,
			};
		});
	}

	return (
		<div>
			<form className="flex flex-col w-[48rem]" onChange={handleChange}>
				<div>
					<Text>Question 1: </Text>
					{/* {securityQuestions.map((question, index) => ( */}
					<Dropdown css={{ w: '64rem' }}>
						<Dropdown.Button
							data-dropdown-toggle="dropdownHover"
							data-dropdown-trigger="hover"
							className="hover:underline underline-offset-4"
							light
							// css={{ w: '48rem' }}
						>
							<Text>{securityQuestions[props.selectedQuestion.question1]}</Text>
						</Dropdown.Button>
						<Dropdown.Menu
							css={{ $$dropdownMenuWidth: '64rem' }}
							onAction={(key) => setQuestion1(key)}
						>
							{securityQuestions.map((question, index) => (
								<Dropdown.Item key={index} onAction>
									<Text>{question}</Text>
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					{/* ))} */}
				</div>
				<Input
					bordered
					// label="Answer"
					name="question1"
					placeholder="Please input answer for Question 1 here."
					value={props.securityResponses.question1}
				/>
				<Spacer y={1.5} />
				<div>
					<Text>Question 2: </Text>
					{/* {securityQuestions.map((question, index) => ( */}
					<Dropdown css={{ w: '64rem' }}>
						<Dropdown.Button
							data-dropdown-toggle="dropdownHover"
							data-dropdown-trigger="hover"
							className="hover:underline underline-offset-4"
							light
							// css={{ w: '48rem' }}
						>
							<Text>{securityQuestions[props.selectedQuestion.question2]}</Text>
						</Dropdown.Button>
						<Dropdown.Menu
							css={{ $$dropdownMenuWidth: '64rem' }}
							onAction={(key) => setQuestion2(key)}
						>
							{securityQuestions.map((question, index) => (
								<Dropdown.Item key={index} onAction>
									<Text>{question}</Text>
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					{/* ))} */}
				</div>
				<Input
					bordered
					// label="Answer"
					name="question2"
					placeholder="Please input answer for Question 2 here."
					value={props.securityResponses.question2}
				/>
				<Spacer y={1.5} />

				<div>
					<Text>Question 3: </Text>
					{/* {securityQuestions.map((question, index) => ( */}
					<Dropdown css={{ w: '64rem' }}>
						<Dropdown.Button
							data-dropdown-toggle="dropdownHover"
							data-dropdown-trigger="hover"
							className="hover:underline underline-offset-4"
							light
							// css={{ w: '48rem' }}
						>
							<Text>{securityQuestions[props.selectedQuestion.question3]}</Text>
						</Dropdown.Button>
						<Dropdown.Menu
							css={{ $$dropdownMenuWidth: '64rem' }}
							onAction={(key) => setQuestion3(key)}
						>
							{securityQuestions.map((question, index) => (
								<Dropdown.Item key={index} onAction>
									<Text>{question}</Text>
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					{/* ))} */}
				</div>
				<Input
					bordered
					// label="Answer"
					name="question3"
					placeholder="Please input answer for Question 3 here."
					value={props.securityResponses.question3}
				/>
				<Spacer y={1.2} />
				<Text color="red">{errorMessage}</Text>
				<Spacer y={1.2} />
				{/* <Button
					auto
					css={{ w: '18rem', margin: 'auto' }}
					// onPress={checkValid}
				>
					Submit
				</Button> */}
			</form>
		</div>
	);
};

export default SecurityQuestionsForm;
