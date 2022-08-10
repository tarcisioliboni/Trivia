const addEntryAction = (info) => (dispatch, getState) => {
  const { ranking } = getState();
  const newRanking = [...ranking, info];

  dispatch({ type: 'SET_RANKING', ranking: newRanking });
  localStorage.setItem('ranking', JSON.stringify(newRanking));
};

export default addEntryAction;
