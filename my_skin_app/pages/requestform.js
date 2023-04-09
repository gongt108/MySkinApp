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

const RequestForm = () => {
	const [inputtedProduct, setInputtedProduct] = useState({
		productName: '',
		productURL: '',
	});
	const [errorMessage, setErrorMessage] = useState('');
	const [isValid, setIsValid] = useState(false);

	function handleChange(event) {
		const { name, value } = event.target;

		setInputtedProduct((prevValue) => {
			return {
				...prevValue,
				[name]: value,
			};
		});
	}

	function checkValid() {
		if (!inputtedProduct.productName || !inputtedProduct.productURL) {
			setErrorMessage('Please complete required fields.');
			console.log(inputtedProduct);
		} else {
			setErrorMessage('');
			setIsValid(true);
		}
	}

	return (
		<div className="mx-12 w-96 relative">
			<Text h1 size={30} weight="bold">
				Product Recommendation
			</Text>
			<Spacer y={0.5} />
			<form className="flex flex-col" onChange={handleChange}>
				<Input
					clearable
					bordered
					label="Product Name"
					name="productName"
					placeholder="Product Name"
				/>
				<Spacer y={1.5} />
				<Input
					clearable
					bordered
					label="Product URL"
					name="productURL"
					placeholder="Product URL"
				/>
				<Spacer y={1.2} />
				<Text color="red">{errorMessage}</Text>
				<Spacer y={1.2} />
				<Button auto css={{ w: '18rem', margin: 'auto' }} onPress={checkValid}>
					Submit
				</Button>
			</form>
		</div>
	);
};

export default RequestForm;
