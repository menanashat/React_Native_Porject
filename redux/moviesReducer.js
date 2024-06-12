
const initialState = {
  likedMovies: [],
  allMovies: [],
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_LIKE':
     
    case 'FETCH_MOVIES_SUCCESS':
      return {
        ...state,
        allMovies: action.payload, 
      };
    default:
      return state;
  }
};

export default moviesReducer;
