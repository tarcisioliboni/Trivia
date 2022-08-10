const initialState = null;

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_TOKEN':
    return action.token;
  default:
    return state;
  }
};

export default tokenReducer;
