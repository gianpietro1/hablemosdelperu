import React, { useContext } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Menu } from 'semantic-ui-react';
import Text from './Text';
import 'beautiful-react-diagrams/styles.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Diagrams from './Diagrams';
import SearchBar from './SearchBar';
import { Context as MenuContext } from '../context/MenuContext';

const ConstitutionMenu = () => {
  const {
    state: { activeSubMenu },
    changeActiveSubMenu,
  } = useContext(MenuContext);

  const handleItemClick = (e, { name }) => changeActiveSubMenu(name);

  return (
    <Router>
      <Menu size="small" tabular>
        <Menu.Item
          as={Link}
          to="/constitucion"
          name="tab01"
          active={activeSubMenu === 'tab01'}
          onClick={handleItemClick}>
          Diagrama 1993
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="texto"
          name="tab02"
          active={activeSubMenu === 'tab02'}
          onClick={handleItemClick}>
          Texto 1993
        </Menu.Item>
      </Menu>
      <Switch>
        <Route path="/texto">
          <Text />
        </Route>
        <Route path="/constitucion">
          <SearchBar />
          <Diagrams />
        </Route>
      </Switch>
    </Router>
  );
};

export default ConstitutionMenu;
