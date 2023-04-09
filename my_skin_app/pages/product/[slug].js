import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ReactStars from 'react-stars';
import {
	Text,
	Image,
	Button,
	Dropdown,
	Spacer,
	Modal,
} from '@nextui-org/react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { store, persistor, persistedReducer } from '../../store';
import { addFavorite, removeFavorite } from '../../features/userSlice';

const ProductDetails = ({ users, product, products, reviews }) => {
	const { brand, productName, imgURL, productShop, slug } = product;
	const dispatch = useDispatch();

	const [visible, setVisible] = React.useState(false);
	const [isFavorited, setIsFavorite] = useState(false);
	// const favorites = useSelector((store) => store.favorites);

	const router = useRouter();
	const savedUser = useSelector((store) => store.persistedReducer);

	function addReview() {
		if (!savedUser.name) {
			setVisible(true);
		} else {
			checkPreviouslyReviewed()
				? router.push(`/editreview/${slug}`)
				: router.push(`/review/${slug}`);
		}
	}

	const closeHandler = () => {
		setVisible(false);
	};

	// function toggleFavorite() {
	// 	setIsFavorite(!isFavorited);
	// }

	const addToFavorites = () => {
		dispatch(addFavorite(slug));
		setIsFavorite(true);
	};

	const removeFromFavorites = () => {
		dispatch(removeFavorite(slug));
		setIsFavorite(false);
	};

	function getStarRating() {
		const rating =
			reviews.reduce((acc, curr) => acc + curr.starRating, 0) / reviews.length;
		if (reviews.length > 0) {
			axios.put(`http://localhost:8082/api/products/${product._id}`, {
				starRating: rating.toFixed(2),
			});
		}
		return rating.toFixed(2);
	}

	function getAuthor(review) {
		const test = users.filter((user) => user._id == review.user);
		if (test.length == 0) {
			return { username: 'User Deleted.', skinType: '', skinTypeOptional: '' };
		} else {
			return test[0];
		}
	}

	function checkPreviouslyReviewed() {
		const check =
			reviews.filter((review) => review.user == savedUser._id).length > 0;
		return check;
	}

	return (
		<div>
			<div className="w-screen flex flex-col mt-16 pl-16 ">
				<div className="flex">
					<div className="">
						<Image
							width={300}
							height={450}
							src={imgURL}
							alt="incidecoder"
							objectFit="cover"
						/>
					</div>
					<div className="product-detail-desc ml-32 mt-12">
						<Link
							className="text-gray-400 hover:underline"
							css={{ color: '#505050' }}
							href={`/brand/${brand}`}
						>
							{brand}
						</Link>
						<Text size="$3xl">{productName}</Text>
						<div className="reviews my-2">
							<div className="flex space-x-4 place-items-center">
								<ReactStars
									count={5}
									value={getStarRating()}
									size={20}
									half={true}
									edit={false}
									color1={'#D3D3D3'}
									color2={'#000000'}
								/>
								<Text size={16} color={'#696969'}>
									{reviews.length > 1 ? `(${getStarRating()})` : ''}
								</Text>
							</div>

							<Link href="#reviews" css={{ color: 'gray' }}>
								{' '}
								{reviews.length} Review(s)
							</Link>
						</div>
						<div className="buttons mt-12 flex flex-row space-x-4">
							<Button onPress={addReview} color="text" ghost>
								Add a Review
							</Button>
							<Modal
								closeButton
								aria-labelledby="modal-title"
								open={visible}
								onClose={closeHandler}
								css={{ padding: '2rem' }}
							>
								<Modal.Body>
									<Text className="text-center">
										Please <Link href="/login/">sign in</Link> first.
									</Text>
								</Modal.Body>
							</Modal>
							<Dropdown>
								<Dropdown.Trigger>
									<Button flat>Where to Buy</Button>
								</Dropdown.Trigger>
								<Dropdown.Menu>
									{productShop.length > 0 &&
										Object.keys(productShop[0]).map((item, index) => (
											<Dropdown.Item key={index}>
												<Link href={productShop[0][item]}>{item}</Link>
											</Dropdown.Item>
										))}
								</Dropdown.Menu>
							</Dropdown>

							<button className="ml-8" css={{ color: 'black' }}>
								{isFavorited ? (
									<AiFillHeart
										size={24}
										className="text-red-500 hover:text-black"
										onClick={removeFromFavorites}
									/>
								) : (
									<AiOutlineHeart
										size={24}
										className="hover:text-red-500"
										onClick={addToFavorites}
									/>
								)}
							</button>
						</div>
						<div className="details-container mt-12">
							<h4>Details:</h4>
							<p>description</p>
						</div>
						<div className="details-container flex mt-12 text-gray-500 space-x-2">
							<h4>Recommended for:</h4>
							<p>
								{getRecommendedSkinType(users, product, reviews).join(', ')}
							</p>
						</div>
					</div>
				</div>

				<div id="reviews" className="mt-16 w-3/4">
					<Text size="$3xl">Reviews</Text>
					{reviews.length == 0 ? (
						<Text>There are no reviews yet.</Text>
					) : (
						<div>
							{reviews.map((review, index) => (
								<div key={index}>
									<div className="flex place-items-center">
										<FaUserCircle size={32} color="#A9A9A9" />
										<div className="ml-2">
											<Text color="#383838">{getAuthor(review).username}</Text>
											<Text color="#383838">
												{getAuthor(review) && 'Skin Type:'}{' '}
												{getAuthor(review).skinType}
												{getAuthor(review).skinTypeOptional.length > 1
													? `, 
												${getAuthor(review).skinTypeOptional.join(', ')}`
													: ''}
											</Text>
										</div>
									</div>
									<div className="ml-2 my-2 flex place-items-center">
										<ReactStars
											count={5}
											value={review.starRating}
											size={16}
											half={true}
											edit={false}
											color2={'#000000'}
										/>
										<Text className="ml-2" weight="bold">
											{review.headline}
										</Text>
									</div>

									<Text>{review.content}</Text>
									<Spacer y={0.8} />
									<hr />
									<Spacer y={1} />
								</div>
							))}
						</div>
					)}
				</div>
				<Spacer y={0.5} />

				<div id="" className="mt-16">
					<Text size="$3xl">Our Picks for You</Text>
					<div className="marquee overflow-x-auto hover:overflow-scroll">
						<div className="track flex flex-row space-x-8">
							{products.map((item, index) => (
								<Link href={`/product/${item.slug}`} key={index}>
									<Image
										src={item.imgURL}
										width={200}
										height={200}
										objectFit="cover"
										alt={item.productName}
									/>
								</Link>
							))}
						</div>
					</div>
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

export const getRecommendedSkinType = (users, product, reviews) => {
	const recommendedSkinType = [];
	const skinTypeRating = {
		sensitive: [],
		'acne-prone': [],
	};
	if (reviews.length == 0) {
		return ['tbd'];
	}
	reviews.map((review) => {
		const author = users.filter((user) => user._id == review.user)[0];

		if (
			author.skinTypeOptional &&
			author.skinTypeOptional.includes('sensitive')
		) {
			skinTypeRating['sensitive'].push(review.starRating);
		}
		if (
			author.skinTypeOptional &&
			author.skinTypeOptional.includes('acne-prone')
		) {
			skinTypeRating['acne-prone'].push(review.starRating);
		}
	});

	reviews.reduce((acc, review) => {
		const author = users.filter((user) => user._id == review.user)[0];

		if (!acc[author.skinType]) {
			acc[author.skinType] = [review.starRating];
		} else {
			acc[author.skinType].push(review.starRating);
		}
		return acc;
	}, skinTypeRating);

	Object.keys(skinTypeRating).forEach((skinType) => {
		const averageRating =
			skinTypeRating[skinType].reduce((a, b) => a + b) /
			skinTypeRating[skinType].length;

		if (averageRating >= 4) {
			recommendedSkinType.push(skinType);
		}
	});

	if (reviews.length > 0) {
		axios.put(`http://localhost:8082/api/products/${product._id}`, {
			recommendedSkinType: recommendedSkinType,
		});
	}

	return recommendedSkinType;
};

export const getStaticProps = async ({ params: { slug } }) => {
	const userRes = await axios.get('http://localhost:8082/api/users');
	const res = await axios.get('http://localhost:8082/api/products');
	const response = await axios.get('http://localhost:8082/api/reviews');

	const users = userRes.data;
	const products = res.data;
	const product = products.filter((item) => item.slug == slug)[0];
	const reviews = response.data.filter(
		(review) => review.product == product._id
	);

	return {
		props: { users, product, products, reviews },
	};
};

export default ProductDetails;
