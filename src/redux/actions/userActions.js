import { getGravatar, getQuestions, getToken } from '../../api/request';

const loginAction = (email, name) => async (dispatch, getState) => {
  const { settings } = getState();
  const { token } = await getToken();
  const questions = await getQuestions({ token, ...settings });
  const gravatarEmail = getGravatar(email);

  dispatch({ type: 'LOGIN', payload: { name, gravatarEmail, questions } });
  dispatch({ type: 'SET_TOKEN', token });
};

const correctAnswerAction = (difficulty, time) => (dispatch) => {
  const BASE_SCORE = 10;
  const difficultyMultiplier = { hard: 3, medium: 2, easy: 1 };

  const questionScore = BASE_SCORE + (time * difficultyMultiplier[difficulty]);

  dispatch({
    type: 'CORRECT_ANSWER',
    score: questionScore,
  });
};

const resetUserAction = () => (dispatch) => {
  dispatch({ type: 'RESET', reset: true });
};

export { loginAction, correctAnswerAction, resetUserAction };
