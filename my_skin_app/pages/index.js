import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
// import { currentUser } from '../features/userSlice';
import Link from 'next/link';

import { Image, Text, Card, Grid, Button, Col } from '@nextui-org/react';
import SwiperCore, { Autoplay, Navigation, Pagination, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { store, persistor, persistedReducer } from '../store';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
	// const currentUsername = useSelector(state => state.user.name);
	const [topProducts, setTopProducts] = useState([]);
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [recommendedProducts, setRecommendedProducts] = useState([]);

	const savedUser = useSelector((store) => store.persistedReducer);

	SwiperCore.use([Autoplay]);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const { data } = await axios.get('http://localhost:8082/api/products');
				// console.log(data);
				console.log(savedUser);
				setProducts(data.reverse().slice(0, 4));
				setTopProducts(data.sort((a, b) => b.starRating - a.starRating));
				if (savedUser.isLoggedIn) {
					setRecommendedProducts(
						shuffleArray(
							data.filter((product) =>
								product.recommendedSkinType.includes(savedUser.skinType)
							)
						).slice(0, 4)
					);
				}
			} catch (error) {
				console.log(error.message);
			}

			setIsLoading(false);
		};

		fetchData();
	}, []);

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	// console.log(recommendedProducts);

	return (
		<div className="w-screen">
			{!isLoading && (
				<div className="w-screen flex flex-col">
					<Swiper
						style={{
							'--swiper-navigation-color': '#fff',
							'--swiper-pagination-color': '#fff',
							'--swiper-navigation-sides-offset': '2rem',
							'--swiper-pagination-bottom': '1rem',
							'--swiper-pagination-bullet-width': '1.5rem',
							'--swiper-pagination-bullet-height': '0.2rem',
						}}
						slidesPerView={1}
						navigation={true}
						pagination={true}
						keyboard={true}
						modules={[Navigation, Pagination, Keyboard]}
						loop={true}
						autoplay={{
							delay: 5000,
						}}
						className="relative flex w-1/2 mt-8 bg-gray-100 swiper-button-white "
					>
						<SwiperSlide>
							<Link
								className="flex mx-auto"
								href={`/product/${topProducts[0].slug}`}
							>
								<img
									className="object-cover w-full h-[32rem]"
									src={topProducts[0].imgURL}
									alt="Top product 1"
								/>
							</Link>
						</SwiperSlide>
						<SwiperSlide>
							<Link
								className="flex mx-auto"
								href={`/product/${topProducts[1].slug}`}
							>
								<img
									src={topProducts[1].imgURL}
									className="object-cover w-full h-[32rem]"
									alt="Camera"
								/>
							</Link>
						</SwiperSlide>
						<SwiperSlide>
							<Link
								className="flex mx-auto"
								href={`/product/${topProducts[2].slug}`}
							>
								<img
									src={topProducts[2].imgURL}
									className="object-cover w-full h-[32rem]"
									alt="Exotic Fruits"
								/>
							</Link>
						</SwiperSlide>
					</Swiper>

					{/* First 8 most recent products */}
					<Grid.Container
						gap={2}
						justify="flex-start"
						css={{ padding: '2rem 3rem' }}
					>
						{/* {list.map((item, index) => ( */}
						{products.map((product, index) => (
							<Grid xs={6} sm={3} key={index}>
								<Card isPressable>
									<Link
										className="mt-4 w-100"
										href={`/product/${product.slug}`}
									>
										<Card.Body css={{ p: 0 }}>
											<Card.Image
												src={product.imgURL}
												objectFit="cover"
												width={200}
												height={200}
												alt={product.productName}
											/>
										</Card.Body>
										<Card.Footer css={{ justifyItems: 'flex-start' }}>
											<Col wrap="wrap" justify="space-between">
												<Text b>{product.brand} </Text>
												<Text css={{ color: '$accents7', fontSize: '$sm' }}>
													{product.productName}
												</Text>
											</Col>
										</Card.Footer>
									</Link>
								</Card>
							</Grid>
						))}
					</Grid.Container>
					<Link
						href="/products"
						className="my-[1rem] mx-auto"
						css={{ w: '16rem', color: '#696969' }}
					>
						View More Products
					</Link>

					{/* Recommended */}
					<Text size="$3xl" className="mx-auto mt-4">
						RECOMMENDED FOR YOU
					</Text>
					{recommendedProducts.length == 0 && (
						<Text className="mx-auto my-4">Coming Soon</Text>
					)}
					{recommendedProducts.length > 0 && (
						<Grid.Container
							gap={2}
							justify="flex-start"
							css={{ padding: '2rem 3rem' }}
						>
							{/* {list.map((item, index) => ( */}
							{recommendedProducts.map((product, index) => (
								<Grid xs={6} sm={3} key={index}>
									<Card isPressable>
										<Link
											className="mt-4 w-100"
											href={`/product/${product.slug}`}
										>
											<Card.Body css={{ p: 0 }}>
												<Card.Image
													src={product.imgURL}
													objectFit="cover"
													width={200}
													height={200}
													alt={product.productName}
												/>
											</Card.Body>
											<Card.Footer css={{ justifyItems: 'flex-start' }}>
												<Col wrap="wrap" justify="space-between">
													<Text b>{product.brand} </Text>
													<Text css={{ color: '$accents7', fontSize: '$sm' }}>
														{product.productName}
													</Text>
												</Col>
											</Card.Footer>
										</Link>
									</Card>
								</Grid>
							))}
						</Grid.Container>
					)}

					{/* Recently Viewed */}
					<Text size="$3xl" className="mx-auto mt-4">
						USEFUL LINKS
					</Text>

					{/* Quizzes */}
					<Grid.Container gap={3} justify="center">
						<Grid>
							<Link href="https://skinskoolbeauty.com/">
								<Card
									isPressable
									css={{ height: '30rem' }}
									className="flex px-4 py-2"
								>
									<Card.Body>
										<Image
											width={320}
											height={320}
											src="https://pbs.twimg.com/profile_images/631219266801565697/PMeTWe3g_400x400.jpg"
											alt="incidecoder"
											objectFit="cover"
											css={{ borderRadius: '50%' }}
										/>
										<Text className="text-lg font-semibold mt-2">
											SKINSKOOL: Skin Compare
										</Text>
										<Text className="break-normal">
											Discover skincare and haircare products
										</Text>
										<Text>with similar ingredients.</Text>
									</Card.Body>
								</Card>
							</Link>
						</Grid>
						<Grid>
							<Link href="https://colorwise.me/self-analysis">
								<Card
									isPressable
									css={{ height: '30rem' }}
									className="flex px-4 py-2"
								>
									<Card.Body>
										<Image
											width={320}
											height={320}
											src="https://colorwise.me/images/palettes/deep-winter.4c732a52.png"
											alt="incidecoder"
											className="mx-2 mb-2"
										/>
										<Text className="text-lg font-semibold mt-2">
											COLORWISE.ME
										</Text>
										<Text>Discover your palette</Text>
									</Card.Body>
								</Card>
							</Link>
						</Grid>
						<Grid>
							<Link className="flex" href="https://incidecoder.com/">
								<Card
									isPressable
									css={{ height: '30rem' }}
									className="flex px-4 py-2"
								>
									<Card.Body>
										<Image
											width={320}
											height={320}
											src="https://incidecoder-assets.storage.googleapis.com/assets/img/tubes.png"
											alt="incidecoder"
											className="mx-2 mb-2"
										/>
										<Text className="text-lg font-semibold mt-2">
											INCIDecoder
										</Text>
										<Text>Decode ingredient lists like a pro</Text>
									</Card.Body>
								</Card>
							</Link>
						</Grid>
					</Grid.Container>
				</div>
			)}
		</div>
	);
};

export default Home;
