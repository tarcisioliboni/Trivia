const initialState = JSON.parse(localStorage.getItem('ranking') || '[]');

const rankingReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_RANKING':
    return action.ranking;
  default:
    return state;
  }
};

export default rankingReducer;
