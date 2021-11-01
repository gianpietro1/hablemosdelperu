import lataminfoapi from '../api/lataminfoapi';
import createDataContext from './createDataContext';

const countriesReducer = (state, action) => {
  switch (action.type) {
    case 'get_countries':
      return { ...state, countries: action.payload };
    default:
      return state;
  }
};

const getCountries = (dispatch) => async () => {
  const response = await lataminfoapi.get(`/countries`, {});
  dispatch({ type: 'get_countries', payload: response.data });
};

export const { Context, Provider } = createDataContext(
  countriesReducer,
  {
    getCountries,
  },
  { countries: [] },
);
