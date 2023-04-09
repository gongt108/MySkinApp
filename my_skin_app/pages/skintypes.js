import React from 'react';
import { Text, Link, Image, Button, Dropdown } from '@nextui-org/react';
import {
	AiFillStar,
	AiOutlineStar,
	AiTwotoneHeart,
	AiOutlineHeart,
} from 'react-icons/ai';
import axios from 'axios';
import RequestForm from '../components/RequestForm';
import { clearFavorites } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const SkinTypes = () => {
	const dispatch = useDispatch();

	const clearFavorite = () => dispatch(clearFavorites());

	return (
		<div>
			<Button onPress={clearFavorite}>Clear favorites</Button>
		</div>
	);
};

export default SkinTypes;
