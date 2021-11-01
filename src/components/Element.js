import React, { useState, useEffect } from 'react';
import '../assets/styles/element.css';
import corrupcion01 from '../assets/tempDB/corrupcion01.png';
import educacion01 from '../assets/tempDB/educacion01.png';
import politica01 from '../assets/tempDB/politica01.png';
import Share from './Share';
import { HashLink as Link } from 'react-router-hash-link';
import { Dropdown, Card } from 'semantic-ui-react';

const Element = () => {
  const url = window.location.href.split('#')[1];
  const topicFromUrl = url ? decodeURI(url.split('-')[0]) : '';
  const subtopicFromUrl = url ? decodeURI(url.split('-')[1]) : '';

  const [topic, setTopic] = useState(topicFromUrl);
  const [subtopic, setSubtopic] = useState(subtopicFromUrl);
  const [filtered, setFiltered] = useState('');

  const elements = [
    {
      image: corrupcion01,
      topic: 'Corrupción',
      subtopic: 'Costo histórico',
    },
    {
      image: educacion01,
      topic: 'Educación',
      subtopic: 'Brecha de genéro',
    },
    {
      image: politica01,
      topic: 'Política',
      subtopic: 'Sufragio universal',
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
    { key: 3, text: 'Política', value: 'Política' },
  ];
  const subtopics = {
    Todos: [{ key: 0, text: 'Todos', value: '' }],
    Corrupción: [
      { key: 0, text: 'Todos', value: '' },
      { key: 1, text: 'Costo histórico', value: 'Costo histórico' },
    ],
    Educación: [
      { key: 0, text: 'Todos', value: '' },
      { key: 1, text: 'Brecha de genéro', value: 'Brecha de genéro' },
    ],
    Política: [
      { key: 0, text: 'Todos', value: '' },
      { key: 1, text: 'Sufragio universal', value: 'Sufragio universal' },
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
          placeholder="Tema"
          selection
          options={topics}
          value={topic}
        />
        <Dropdown
          onChange={(e, { value }) => setSubtopic(value)}
          options={subtopics ? subtopics[topic] : ['HOLA']}
          placeholder="Subtema"
          selection
          value={subtopic}
        />
      </div>
      <div className="cardsDiv">
        {filtered &&
          filtered.map((element) => {
            const anchor = encodeURI(element.topic + '-' + element.subtopic);
            return (
              <Card
                key={element.topic + element.subtopic}
                fluid
                style={{ padding: '1rem' }}
                id={anchor}>
                <Card.Content>
                  <Card.Header style={{ marginBottom: '0.5rem' }}>
                    <Link
                      to={`/#${anchor}`}
                      scroll={(el) =>
                        el.scrollIntoView({ behavior: 'auto', block: 'end' })
                      }>
                      {element.topic} - {element.subtopic}
                    </Link>
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
                          'https://analitica.hablemosdelperu.com#' + anchor
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
