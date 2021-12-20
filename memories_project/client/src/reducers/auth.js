import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action = null) => {
  console.log(action.type, 'action type');
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return {
        ...state, authData: action.data, loading: false, errors: null,
      };
    case LOGOUT:
      console.log('localStorage Cleared');
      localStorage.clear();

      return {
        ...state, authData: null, loading: false, errors: null,
      };
    default:
      return state;
  }
};

export default authReducer;
