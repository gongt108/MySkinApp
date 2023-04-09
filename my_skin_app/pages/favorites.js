import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import {
	Image,
	Text,
	Card,
	Grid,
	Button,
	Modal,
	Spacer,
} from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { clearFavorites } from '../features/userSlice';
import { store, persistor, persistedReducer } from '../store';

const Favorites = (props) => {
	// const router = useRouter();
	const savedUser = useSelector((store) => store.persistedReducer);
	const allProducts = props.data;
	// const favoriteSlugs = savedUser.favorites;
	const favorites = allProducts.filter((item) =>
		savedUser.favorites.includes(item.slug)
	);

	const dispatch = useDispatch();
	const clearFavorite = () => {
		dispatch(clearFavorites());
		setVisible(false);
	};

	const [visible, setVisible] = React.useState(false);

	const openHandler = () => {
		setVisible(true);
	};

	const closeHandler = () => {
		setVisible(false);
	};

	return (
		<div className="py-4 px-8">
			<div className="flex flex-row justify-between">
				<div className="flex flex-col">
					<Text size="$2xl">{savedUser.name}'s Saved Items</Text>
					<Text size="xs" color="gray">
						(Not you?{' '}
						<Link
							href="/logout"
							className="hover:underline"
							css={{ color: '#A8A8A8' }}
						>
							Sign out.
						</Link>
						)
					</Text>
				</div>

				{favorites.length > 0 && (
					<Button color="error" flat auto onPress={openHandler}>
						Clear all
					</Button>
				)}
				<Modal
					closeButton
					aria-labelledby="modal-title"
					open={visible}
					onClose={closeHandler}
					css={{ padding: '2rem' }}
				>
					<Modal.Header>
						<Text h1 size={18} weight="bold">
							Are you sure you want to clear your favorites?
						</Text>
					</Modal.Header>
					<Spacer y={0.5} />
					<div className="flex justify-center space-x-4">
						<Button color="black" ghost auto onPress={clearFavorite}>
							Yes
						</Button>
						<Button color="error" flat auto onPress={closeHandler}>
							No
						</Button>
					</div>
				</Modal>
			</div>

			{favorites.length == 0 ? (
				<Text css={{ paddingTop: '1rem' }}>You don't have any favorites.</Text>
			) : (
				<Grid.Container gap={2} css={{ padding: '2rem 3rem' }}>
					{favorites.map((item, index) => (
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
			)}
		</div>
	);
};

export const getServerSideProps = async () => {
	const res = await axios.get('http://localhost:8082/api/products');

	return {
		props: { data: res.data },
	};
};

export default Favorites;
