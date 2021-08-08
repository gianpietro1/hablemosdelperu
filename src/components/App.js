import React, { useContext } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Menu } from 'semantic-ui-react';
import Text from './Text';
import 'beautiful-react-diagrams/styles.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Diagrams from './Diagrams';
import { Context as MenuContext } from '../context/MenuContext';

const App = () => {
  const {
    state: { activeMenu },
    changeActiveMenu,
  } = useContext(MenuContext);

  const handleItemClick = (e, { name }) => changeActiveMenu(name);

  return (
    <Router>
      <div className="ui container">
        <Menu tabular>
          <Menu.Item
            as={Link}
            to="/"
            name="diagram"
            active={activeMenu === 'diagram'}
            onClick={handleItemClick}>
            Diagrama 1993
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="texto"
            name="text"
            active={activeMenu === 'text'}
            onClick={handleItemClick}>
            Texto 1993
          </Menu.Item>
        </Menu>
        <Switch>
          <Route path="/acerca">
            <Text />
          </Route>
          <Route path="/texto">
            <Text />
          </Route>
          <Route path="/">
            <Diagrams />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
