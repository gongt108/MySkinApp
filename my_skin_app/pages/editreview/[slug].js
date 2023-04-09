import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Text,
	Link,
	Image,
	Button,
	Spacer,
	Input,
	Textarea,
} from '@nextui-org/react';
import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import { store, persistor, persistedReducer } from '../../store';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import ReactStars from 'react-stars';
import { getRecommendedSkinType } from '../product/[slug]';

const ReviewDetails = ({ users, product, reviews }) => {
	// const [currentUsername, setCurrentUser] = useState('');
	// const dispatch = useDispatch();

	const router = useRouter();
	const savedUser = useSelector((store) => store.persistedReducer);
	const [errorMessage, setErrorMessage] = useState('');

	const { brand, productName, imgURL, productShop, slug, _id } = product;

	const review = reviews.filter((review) => review.user == savedUser._id)[0];

	const [reviewDetails, setReviewDetails] = useState({
		headline: review.headline,
		starRating: review.starRating,
		content: review.content,
	});

	useEffect(() => {
		if (!savedUser.name) {
			router.push('/login');
		}
	}, []);

	const ratingChanged = (newRating) => {
		setReviewDetails((prevValue) => {
			return {
				...prevValue,
				starRating: newRating,
			};
		});
	};

	function handleChange(event) {
		const { name, value } = event.target;

		setReviewDetails((prevValue) => {
			return {
				...prevValue,
				[name]: value,
			};
		});
	}

	function checkValid() {
		if (reviewDetails.headline.length < 4) {
			setErrorMessage('Please input a review headline (min. characters: 4).');
		} else if (reviewDetails.starRating == '') {
			setErrorMessage('Please rate the product.');
		} else if (
			reviewDetails.content == '' ||
			reviewDetails.content.length < 100
		) {
			setErrorMessage('Please complete your review.');
		} else {
			setErrorMessage('');
			saveReview();
		}
	}

	function saveReview() {
		axios
			.put(`http://localhost:8082/api/reviews/${review._id}`, {
				headline: reviewDetails.headline,
				starRating: reviewDetails.starRating,
				content: reviewDetails.content,
			})
			.catch((err) => {
				// e.preventDefault();
				console.log('Error in creating review!', err);
			});

		// getRecommendedSkinType(users, product, reviews);

		router.push(`/product/${slug}`);
	}

	return (
		<div className="w-screen flex flex-col mt-16 pl-16 ">
			<div className="flex flex-col justify-center">
				<Image
					width={200}
					height={300}
					src={imgURL}
					alt="incidecoder"
					objectFit="cover"
				/>
				<Text className="text-center mt-4" size="$3xl">
					{productName}
				</Text>
			</div>
			<div id="reviews" className="mt-16">
				<Text size="$3xl">Reviews</Text>
				<Text>Currently signed in as {savedUser.name}</Text>
				<Text>
					Skin Type: {savedUser.skinType}
					{savedUser.skinTypeOptional.length !== 0
						? `, ${savedUser.skinTypeOptional.join(', ')}`
						: ''}
				</Text>
				<Text size="xs" color="gray">
					Not you?{' '}
					<Link
						href="/logout"
						className="hover:underline"
						css={{ color: '#A8A8A8' }}
					>
						Sign out.
					</Link>
				</Text>

				<div className="mt-8 w-96 relative">
					<Spacer y={0.5} />
					<form className="flex flex-col" onChange={handleChange}>
						<Input
							bordered
							label="Review Headline"
							name="headline"
							placeholder="Good for sensitive, dry skin"
							value={reviewDetails.headline}
						/>
						<Spacer y={1} />
						<div className="flex flex-row" style={{ fontSize: '20px' }}>
							<ReactStars
								count={5}
								onChange={ratingChanged}
								value={reviewDetails.starRating}
								size={24}
								half={false}
								// color2={'#000000'}
							/>
						</div>
						<Spacer y={0.5} />
						<Textarea
							label="Write your thoughts"
							name="content"
							placeholder="Enter your amazing ideas."
							value={reviewDetails.content}
							helperText={
								reviewDetails.content.length == 0
									? 'Min. character count: 100'
									: `Minimum required characters left: ${
											reviewDetails.content.length >= 100
												? 0
												: 100 - reviewDetails.content.length
									  }`
							}
						/>
						<Spacer y={1.2} />
						<Text size={14} color="red">
							{errorMessage}
						</Text>
						<Spacer y={1.2} />

						<Button
							css={{ backgroundColor: '#000000' }}
							auto
							onPress={checkValid}
						>
							Submit
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export const getStaticPaths = async () => {
	const res = await axios.get('http://localhost:8082/api/products');
	const products = res.data;

	const paths = products.map((product) => ({
		params: {
			slug: product.slug,
		},
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	const userRes = await axios.get('http://localhost:8082/api/users');
	const productsRes = await axios.get('http://localhost:8082/api/products');
	const reviewRes = await axios.get('http://localhost:8082/api/reviews');

	const users = userRes.data;
	const products = productsRes.data;
	const product = products.filter((item) => item.slug == slug)[0];

	const reviews = reviewRes.data.filter(
		(review) => review.product == product._id
	);

	return {
		props: { users, product, reviews },
	};
};

export default ReviewDetails;
