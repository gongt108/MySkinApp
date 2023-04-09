import { createSlice, nanoid } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
	isLoggedIn: false,
	isGuest: false,
	_id: '',
	name: '',
	skinType: 'normal',
	skinTypeOptional: [],
	securityQuestions: [],
	securityResponses: [],
	reviews: [],
	favorites: [],
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: {
			reducer: (state, action) => {
				(state.isLoggedIn = action.payload.isLoggedIn),
					(state.isGuest = action.payload.isGuest),
					(state._id = action.payload._id),
					(state.name = action.payload.name),
					(state.skinType = action.payload.skinType),
					(state.skinTypeOptional = action.payload.skinTypeOptional),
					(state.securityQuestions = action.payload.securityQuestions),
					(state.securityResponses = action.payload.securityResponses),
					(state.reviews = action.payload.reviews),
					(state.favorites = action.payload.favorites);
			},
		},
		logoutUser: {
			reducer: (state) => {
				(state.isLoggedIn = false),
					(state.isGuest = true),
					(state._id = ''),
					(state.name = ''),
					(state.skinType = 'normal'),
					(state.skinTypeOptional = []),
					(state.securityQuestions = []),
					(state.securityResponses = []),
					(state.reviews = []),
					(state.favorites = []);
			},
		},
		addFavorite: {
			reducer: (state, action) => {
				state.favorites = [...state.favorites, action.payload];
				// console.log(state.favorites);
			},
			prepare: (item) => {
				// console.log(item);
				return { payload: item };
			},
		},
		removeFavorite: (state, action) => {
			const index = state.favorites.findIndex(
				(favorite) => favorite.id === action.payload.id
			);
			let newBasket = [...state.favorites];

			if (index >= 0) {
				newBasket.splice(index, 1);
			} else {
				console.warn(`Item not in basket. Try again.`);
			}
			state.favorites = newBasket;
		},
		addReview: {
			reducer: (state, action) => {
				state.reviews = [...state.reviews, action.payload];
			},
			prepare: (review) => {
				const id = nanoid();
				return { payload: { id, ...review } };
			},
		},
		clearFavorites: (state, action) => {
			state.favorites = [];
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return (state = {
				...state,
				...action.payload.category,
			});
		},
	},
});

export const {
	setUser,
	logoutUser,
	addReview,
	addFavorite,
	removeFavorite,
	clearFavorites,
} = userSlice.actions;

export const selectedBasketItems = (state) => state.user.reviews;
export const currentUser = (state) => state.user.name;

export default userSlice.reducer;
