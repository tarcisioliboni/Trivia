const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  questions: [],
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, ...action.payload };
  case 'SET_QUESTIONS':
    return { ...state, questions: action.questions };
  case 'CORRECT_ANSWER':
    return {
      ...state,
      assertions: state.assertions + 1,
      score: state.score + action.score,
    };
  case 'RESET':
    console.log(action);
    return initialState;
  default:
    return state;
  }
};

export default playerReducer;
