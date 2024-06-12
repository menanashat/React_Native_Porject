
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteProducts: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action) {
      state.favoriteProducts.push(action.payload);
    },
    removeFavorite(state, action) {
      state.favoriteProducts = state.favoriteProducts.filter(product => product.id !== action.payload);
    }
    
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
