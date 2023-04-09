import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Image, Text, Card, Grid, Button, Spacer } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';

const BrandProducts = ({ products }) => {
	const allProducts = products;
	// const favorites = allProducts.filter((item) =>
	// 	favoriteSlugs.includes(item.slug)
	// );

	const dispatch = useDispatch();

	return (
		<div className="py-4 px-8">
			<div className="flex flex-row justify-between">
				<div className="flex flex-col">
					{/* <Text size="$2xl">{savedUser.name}'s Saved Items</Text> */}
				</div>
			</div>

			<Grid.Container gap={2} css={{ padding: '2rem 3rem' }}>
				{allProducts.map((item, index) => (
					<Grid xs={6} sm={3} key={index}>
						<Card isPressable>
							<Link href={`/product/${item.slug}`}>
								<Card.Body>
									<Image
										src={item.imgURL}
										objectFit="cover"
										width={200}
										height={200}
										alt={item.productName}
									/>
									<div className="mt-4 px-3">
										<Text b>{item.brand} </Text>
										<Text css={{ color: '$accents7', fontSize: '$sm' }}>
											{item.productName}
										</Text>
									</div>
								</Card.Body>
							</Link>
						</Card>
					</Grid>
				))}
			</Grid.Container>
		</div>
	);
};

export const getStaticPaths = async () => {
	const res = await axios.get('http://localhost:8082/api/products');
	const products = res.data;

	const paths = products.map((product) => ({
		params: {
			brand: product.brand,
		},
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps = async ({ params: { brand } }) => {
	const res = await axios.get('http://localhost:8082/api/products');
	const products = res.data.filter((item) => item.brand == brand);

	return {
		props: { products },
	};
};

export default BrandProducts;
