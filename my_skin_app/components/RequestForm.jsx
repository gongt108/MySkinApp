import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Input, Button, Text, Spacer, Modal } from '@nextui-org/react';
import axios from 'axios';

const RequestForm = (props) => {
	const [inputtedProduct, setInputtedProduct] = useState({
		productName: '',
		productURL: '',
	});
	const [errorMessage, setErrorMessage] = useState('');
	// const [isValid, setIsValid] = useState(false);

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
			// console.log(inputtedProduct);
		} else {
			setErrorMessage('');
			// setIsValid(true);
			sendData();
		}
	}

	const sendData = async () => {
		// checkValid();
		// e.preventDefault();

		// if (isValid) {
		try {
			const response = await axios.post(
				'http://localhost:8082/api/submissions',
				{
					productName: inputtedProduct.productName,
					productURL: inputtedProduct.productURL,
				}
			);
			setInputtedProduct({
				productName: '',
				productURL: '',
			}),
				setErrorMessage(''),
				props.closeHandler();
			console.log(response.data);
		} catch (error) {
			console.log(error.response);
			setErrorMessage('There was an error. Please try again.');
		}
		// await axios
		// 	.post('http://localhost:8082/api/submissions', {
		// 		productName: inputtedProduct.productName,
		// 		productURL: inputtedProduct.productURL,
		// 	})
		// 	.then(
		// 		setInputtedProduct({
		// 			productName: '',
		// 			productURL: '',
		// 		}),
		// 		setErrorMessage(''),
		// 		props.closeHandler()
		// 	)
		// 	.catch((err) => {
		// 		console.log('Error submitting product!', err);
		// 	});
		// }
	};

	return (
		<div className="mx-12 w-96 relative">
			<Modal
				closeButton
				aria-labelledby="modal-title"
				open={props.visible}
				onClose={props.closeHandler}
				css={{ padding: '2rem' }}
			>
				<Modal.Header>
					<Text h1 size={30} weight="bold">
						Product Recommendation
					</Text>
				</Modal.Header>
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
					<Button
						auto
						css={{ w: '18rem', margin: 'auto' }}
						onPress={checkValid}
					>
						Submit
					</Button>
				</form>
			</Modal>
		</div>
	);
};

export default RequestForm;
