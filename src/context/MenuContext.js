import { createDataContext } from './createDataContext';

const menuReducer = (state, action) => {
  switch (action.type) {
    case 'change_active_menu':
      return { ...state, activeMenu: action.payload };
    default:
      return state;
  }
};

const changeActiveMenu = (dispatch) => (menu) => {
  dispatch({ type: 'change_active_menu', payload: menu });
};

export const { Context, Provider } = createDataContext(
  menuReducer,
  { changeActiveMenu },
  { activeMenu: 'diagram' },
);
