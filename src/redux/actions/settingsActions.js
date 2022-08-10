const updateSettingsAction = (key, value) => (dispatch) => {
  if (!key) {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { [key]: undefined } });
    localStorage.removeItem(`settings_${key}`);
  } else {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { [key]: value } });
    localStorage.setItem(`settings_${key}`, value);
  }
};

export default updateSettingsAction;
