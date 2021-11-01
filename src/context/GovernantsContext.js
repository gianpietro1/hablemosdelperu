import lataminfoapi from '../api/lataminfoapi';
import createDataContext from './createDataContext';

const governantsReducer = (state, action) => {
  switch (action.type) {
    case 'get_governants':
      return { ...state, governants: action.payload };
    default:
      return state;
  }
};

const getGovernants = (dispatch) => async () => {
  const response = await lataminfoapi.get(`/governants`, {});
  dispatch({ type: 'get_governants', payload: response.data });
};

export const { Context, Provider } = createDataContext(
  governantsReducer,
  {
    getGovernants,
  },
  { governants: [] },
);
