import React, { useContext } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Menu } from 'semantic-ui-react';
import Text from './Text';
import 'beautiful-react-diagrams/styles.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Element from './Element';
import PoliticalMap from './PoliticalMap';
import Header from './Header';
import { Context as MenuContext } from '../context/MenuContext';
import ConstitutionMenu from './ConstitutionMenu';

const App = () => {
  const {
    state: { activeMenu },
    changeActiveMenu,
  } = useContext(MenuContext);

  const handleItemClick = (e, { name }) => changeActiveMenu(name);

  console.log(activeMenu);
  return (
    <Router>
      <Header />
      <div className="ui container" style={{ marginTop: '10em' }}>
        <Menu>
          <Menu.Item
            as={Link}
            to="/"
            name="lataminfo"
            active={activeMenu === 'lataminfo'}
            onClick={handleItemClick}>
            Contexto Latinoamericano
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/constitucion"
            name="constitution"
            active={activeMenu === 'constitution'}
            onClick={handleItemClick}>
            Nuestra Constitución
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/compartir"
            name="share"
            active={activeMenu === 'share'}
            onClick={handleItemClick}>
            Compartir
          </Menu.Item>
        </Menu>
        <Switch>
          <Route path="/compartir">
            <Element />
          </Route>
          <Route path="/texto">
            <Text />
          </Route>
          <Route path="/constitucion">
            <ConstitutionMenu />
          </Route>
          <Route path="/">
            <PoliticalMap />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
