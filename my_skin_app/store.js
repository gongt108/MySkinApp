import { applyMiddleware, createStore } from "redux";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
// import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist';
import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';


const persistConfig = {
  key: 'user',
  storage: storageSession,
}

export const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: {
      persistedReducer,
  },
  middleware: [thunk]
})

export const persistor = persistStore(store);

