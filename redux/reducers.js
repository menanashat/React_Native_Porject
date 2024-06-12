import { combineReducers } from 'redux';
import { ADD_TO_CART, REMOVE_FROM_CART, TOGGLE_FAVORITE } from './actions';

const initialCartState = {
  items: []
};

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    default:
      return state;
  }
};

const initialFavoritesState = {
  items: []
};

const favoritesReducer = (state = initialFavoritesState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      return {
        ...state,
        items: state.items.includes(action.payload)
          ? state.items.filter(id => id !== action.payload)
          : [...state.items, action.payload]
      };
    default:
      return state;
  }
};


export default combineReducers({
  cart: cartReducer,
  favorites: favoritesReducer
});
