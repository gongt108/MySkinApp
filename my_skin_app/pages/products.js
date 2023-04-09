import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Text, Grid, Card, Col, Image } from '@nextui-org/react';
import axios from 'axios';

export const skinTypes = [
	'Dry',
	'Combination-Dry',
	'Normal',
	'Combination-Oily',
	'Oily',
	'Acne Prone',
	'Sensitive',
];

const Products = (props) => {
	const router = useRouter();
	const allProducts = props.data;
	const searchQuery = router.query.searchQuery || '';
	const productResults = searchQuery
		? allProducts.filter((product) =>
				product.slug
					.toLowerCase()
					.replace(/-/g, '')
					.includes(searchQuery.replace(/\s/g, '').toLowerCase())
		  )
		: allProducts;

	return (
		<div className="w-screen">
			<Text className="flex justify-center" size="$3xl">
				All Products
			</Text>
			<Grid.Container gap={2} css={{ padding: '2rem 3rem' }}>
				{productResults.map((item, index) => (
					<Grid xs={6} sm={3} key={index}>
						<Card
							isPressable
							// onPress={() => navigateToProductDetails(item)}
						>
							<Link className="w-100" href={`/product/${item.slug}`}>
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

export const getServerSideProps = async () => {
	const res = await axios.get('http://localhost:8082/api/products');

	return {
		props: { data: res.data },
	};
};

export default Products;
