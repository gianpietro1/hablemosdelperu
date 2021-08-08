import React, { useState, useContext, useEffect } from 'react';
import { Header, Button, Segment } from 'semantic-ui-react';
import MainDiagram from './MainDiagram';
import { constitucion } from './jsonONE';
import { Context as MenuContext } from '../context/MenuContext';

const Diagrams = () => {
  const { changeActiveMenu } = useContext(MenuContext);
  const [parentSkipRemoved, setParentSkipRemoved] = useState(false);

  const toggleParentRemoval = () => {
    setParentSkipRemoved(!parentSkipRemoved);
  };

  useEffect(() => {
    changeActiveMenu('diagram');
  }, []);

  return (
    <div>
      {constitucion.map((section, i, arr) => {
        return (
          <div key={i}>
            {!(i > 0 && section.title === arr[i - 1].title) ? (
              <Button attached="top">
                <Header as="h5">{section.title}</Header>
              </Button>
            ) : null}
            <Segment attached>
              <p>{section.subtitle}</p>
              <MainDiagram
                object={section.objects}
                parentSkipRemoved={parentSkipRemoved}
                key={parentSkipRemoved}
                toggleParentRemoval={toggleParentRemoval}
              />
            </Segment>
          </div>
        );
      })}
    </div>
  );
};

export default Diagrams;
