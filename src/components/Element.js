import React, { useState, useEffect } from 'react';
import '../assets/styles/element.css';
import corrupcion01 from '../assets/tempDB/corrupcion01.png';
import educacion01 from '../assets/tempDB/educacion01.png';
import politica01 from '../assets/tempDB/politica01.png';
import Share from './Share';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Dropdown, Card } from 'semantic-ui-react';

const Element = () => {
  const [topic, setTopic] = useState('');
  const [subtopic, setSubtopic] = useState('');
  const [filtered, setFiltered] = useState('');

  const elements = [
    {
      image: corrupcion01,
      topic: 'Corrupción',
      subtopic: 'Costo histórico',
      anchor: 'corrupcion-costo-01',
    },
    {
      image: educacion01,
      topic: 'Educación',
      subtopic: 'Brecha de genéro',
      anchor: 'educacion-brechas-01',
    },
    {
      image: politica01,
      topic: 'Política',
      subtopic: 'Sufragio universal',
      anchor: 'politica-sufragio-universal',
    },
  ];

  useEffect(() => {
    const filteredElements = elements.filter((e) => {
      if (topic) {
        if (subtopic) {
          return e.topic === topic && e.subtopic === subtopic;
        }
        return e.topic === topic;
      }
      return elements;
    });
    setFiltered(filteredElements);
  }, [topic, subtopic]);

  const topics = [
    { key: 0, text: 'Todos', value: '' },
    { key: 1, text: 'Corrupción', value: 'Corrupción' },
    { key: 2, text: 'Educación', value: 'Educación' },
    { key: 2, text: 'Política', value: 'Política' },
  ];
  const subtopics = {
    Todos: [{ key: 0, text: 'Todos', value: '' }],
    Corrupción: [
      { key: 0, text: 'Todos', value: '' },
      { key: 1, text: 'Costo histórico', value: 'Costo histórico' },
    ],
    Educación: [
      { key: 0, text: 'Todos', value: '' },
      { key: 2, text: 'Brecha de genéro', value: 'Brecha de genéro' },
    ],
    Política: [
      { key: 0, text: 'Todos', value: '' },
      { key: 2, text: 'Sufragio universal', value: 'Sufragio universal' },
    ],
  };

  return (
    <div className="contentContainer">
      <div className="navigationDiv">
        <Dropdown
          onChange={(e, { value }) => {
            setTopic(value);
            setSubtopic('');
          }}
          options={topics}
          placeholder="Tema"
          selection
          value={topic}
        />
        <Dropdown
          onChange={(e, { value }) => setSubtopic(value)}
          options={subtopics[topic]}
          placeholder="Subtema"
          selection
          value={subtopic}
        />
      </div>
      <div className="cardsDiv">
        {filtered &&
          filtered.map((element) => {
            return (
              <Card fluid style={{ padding: '1rem' }} id={element.anchor}>
                <Card.Content>
                  <Card.Header style={{ marginBottom: '0.5rem' }}>
                    <AnchorLink offset="200" href={`#${element.anchor}`}>
                      {element.topic} - {element.subtopic}
                    </AnchorLink>
                  </Card.Header>
                  <div style={{ display: 'flex', flex: 1 }}>
                    <div className="contentParentDiv">
                      <img
                        src={element.image}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                    <div className="shareParentDiv">
                      <Share
                        shareUrl={
                          'https://analitica.hablemosdelperu.com#' +
                          element.anchor
                        }
                        text={`${element.topic} - ${element.subtopic}`}
                        imageUrl={element.image}
                      />
                    </div>
                  </div>
                </Card.Content>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Element;
