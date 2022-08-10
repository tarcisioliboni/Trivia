const initialState = {
  category: localStorage.getItem('settings_category'),
  difficulty: localStorage.getItem('settings_difficulty'),
  type: localStorage.getItem('settings_type'),
  amount: localStorage.getItem('settings_amount') || '5',
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_SETTINGS':
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default settingsReducer;
