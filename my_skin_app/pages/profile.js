import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { store, persistor, persistedReducer } from '../store';
import Link from 'next/link';

import { Text, Image, Button, Dropdown, Card, Spacer } from '@nextui-org/react';
import ReactStars from 'react-stars';
import securityQuestions from '../constants/securityQuestions';
import SkinTypesForm from '../components/SkinTypesForm';
import { setUser } from '../features/userSlice';

const Profile = (props) => {
	const savedUser = useSelector((store) => store.persistedReducer);
	const reviews = props.reviews.filter(
		(review) => review.user == savedUser._id
	);
	const [isEditting, setIsEditting] = useState(false);
	const [selectedSkinType, setSelectedSkinType] = useState(savedUser.skinType);
	const [selectedSkinTypeOptional, setSelectedSkinTypeOptional] = useState(
		savedUser.skinTypeOptional
	);

	console.log(savedUser);
	const dispatch = useDispatch();

	function getImgUrl(review) {
		const product = props.products.filter(
			(product) => product._id == review.product
		)[0];
		return product;
	}

	function updateSkinType() {
		console.log(selectedSkinType);
		console.log(selectedSkinTypeOptional);
		axios
			.put(`http://localhost:8082/api/users/${savedUser._id}`, {
				skinType: selectedSkinType,
				skinTypeOptional: selectedSkinTypeOptional,
			})
			.then((res) => {
				dispatch(
					setUser({
						isLoggedIn: true,
						isGuest: false,
						_id: savedUser._id,

						name: savedUser.name,
						securityQuestions: savedUser.securityQuestions,
						securityResponses: savedUser.securityResponses,
						skinType: selectedSkinType,
						skinTypeOptional: selectedSkinTypeOptional,
						reviews: savedUser.review,
					})
				);

				setIsEditting(false);
			})
			.catch((err) => {
				console.log('Error in updating security questions in database.', err);
			});
	}

	function cancelUpdate() {
		setIsEditting(false);
		setSelectedSkinType(savedUser.skinType);
		setSelectedSkinTypeOptional(savedUser.skinTypeOptional);
	}

	// console.log(securityQuestions);

	return (
		<div className="m-8">
			<Card css={{ mw: '800px' }}>
				<Card.Body>
					<div className="flex justify-between pr-4" css={{ w: '600px' }}>
						<Text className="font-bold" size="$xl">
							BASIC INFORMATION
						</Text>
						<Link href="" onClick={() => setIsEditting(true)}>
							Edit
						</Link>
					</div>
					<Text>{savedUser.name}</Text>
					{!isEditting && (
						<Text>
							Skin Type: {savedUser.skinType}
							{savedUser.skinTypeOptional.length !== 0
								? `, ${savedUser.skinTypeOptional.join(', ')}`
								: ''}
						</Text>
					)}
					{isEditting && (
						<div className="m-4">
							<SkinTypesForm
								selectedSkinType={selectedSkinType}
								setSelectedSkinType={setSelectedSkinType}
								selectedSkinTypeOptional={selectedSkinTypeOptional}
								setSelectedSkinTypeOptional={setSelectedSkinTypeOptional}
							/>
							<div className="flex items-center mt-8 space-x-8">
								<Button onPress={updateSkinType}>Save Changes</Button>
								<Text
									className="hover:underline hover:cursor-pointer"
									onClick={cancelUpdate}
								>
									Cancel
								</Text>
							</div>
						</div>
					)}
				</Card.Body>
			</Card>
			<Spacer y={0.5} />

			<Card css={{ mw: '800px' }}>
				<Card.Body>
					<div className="flex justify-between pr-4" css={{ w: '600px' }}>
						<Text className="font-bold" size="$xl">
							SECURITY
						</Text>
					</div>

					<div className="flex justify-between pr-4 mb-4" css={{ w: '600px' }}>
						<Text>Password: *****</Text>
						<Link href="/resetpassword">Reset Password</Link>
					</div>
					<div className="flex justify-between pr-4" css={{ w: '600px' }}>
						<div>
							<div>
								<div className="flex">
									<Text>Question 1: </Text>
									<Spacer x={0.5} />
									<Text>
										{
											securityQuestions[
												savedUser.securityQuestions[0].question1
											]
										}
									</Text>
								</div>
								<Text>Answer: *****</Text>
							</div>
							<Spacer y={0.5} />

							<div>
								<div className="flex">
									<Text>Question 2: </Text>
									<Spacer x={0.5} />

									<Text>
										{
											securityQuestions[
												savedUser.securityQuestions[0].question2
											]
										}
									</Text>
								</div>
								<Text>Answer: *****</Text>
							</div>
							<Spacer y={0.5} />

							<div>
								<div className="flex">
									<Text>Question 3: </Text>
									<Spacer x={0.5} />

									<Text>
										{
											securityQuestions[
												savedUser.securityQuestions[0].question3
											]
										}
									</Text>
								</div>
								<Text>Answer: *****</Text>
							</div>
						</div>
						<Link href="/resetsecurityquestions">
							Change Security Questions
						</Link>
					</div>
				</Card.Body>
			</Card>
			<Spacer y={0.5} />

			<Card css={{ mw: '800px' }}>
				<Card.Body>
					<Text className="font-bold" size="$xl">
						REVIEWS
					</Text>
					{reviews.length == 0 && 'No reviews yet.'}
					{reviews.map((review, index) => (
						<Link
							key={index}
							href={`/product/${getImgUrl(review).slug}`}
							className="flex flex-row my-2 w-[48rem] overflow-hidden bg-slate-50"
						>
							<Image
								width={100}
								height={150}
								src={getImgUrl(review).imgURL}
								alt="incidecoder"
								objectFit="cover"
							/>
							<div className="flex flex-col w-[36rem]">
								<Text className="font-semibold">{review.headline}</Text>
								<ReactStars
									count={5}
									value={review.starRating}
									size={16}
									half={true}
									edit={false}
									color2={'#000000'}
								/>
								<Text className="text-ellipsis">{review.content}</Text>
							</div>
						</Link>
					))}
				</Card.Body>
			</Card>
		</div>
	);
};

// export const getStaticPaths = async () => {
// 	const res = await axios.get('http://localhost:8082/api/products');
// 	const products = res.data;

// 	const paths = products.map((product) => ({
// 		params: {
// 			slug: product.slug,
// 		},
// 	}));

// 	return {
// 		paths,
// 		fallback: 'blocking',
// 	};
// };

export const getServerSideProps = async () => {
	const productsRes = await axios.get('http://localhost:8082/api/products');
	// const savedUser = useSelector((store) => store.persistedReducer);
	const reviewRes = await axios.get('http://localhost:8082/api/reviews');

	const products = productsRes.data;
	const reviews = reviewRes.data;
	// const product = products.filter((item) => item.slug == slug);

	return {
		props: { products, reviews },
	};
};

export default Profile;
