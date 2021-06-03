import React, { useState, useEffect } from 'react';
import corrupcion01 from '../assets/tempDB/corrupcion01.png';
import educacion01 from '../assets/tempDB/educacion01.png';
import corrupcion03 from '../assets/tempDB/corrupcion01.png';
import Share from './Share';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Dropdown, Grid, Segment } from 'semantic-ui-react';

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
      image: corrupcion03,
      topic: 'Corrupción',
      subtopic: 'Costo histórico',
      anchor: 'corrupcion-costo-03',
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
    console.log(filteredElements);
    setFiltered(filteredElements);
  }, [topic, subtopic]);

  const topics = [
    { key: 0, text: 'Todos', value: '' },
    { key: 1, text: 'Corrupción', value: 'Corrupción' },
    { key: 2, text: 'Educación', value: 'Educación' },
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
  };

  return (
    <>
      <div>
        <Grid columns={2}>
          <Grid.Column>
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
          </Grid.Column>
          <Grid.Column>
            <Dropdown
              onChange={(e, { value }) => setSubtopic(value)}
              options={subtopics[topic]}
              placeholder="Subtema"
              selection
              value={subtopic}
            />
          </Grid.Column>
        </Grid>
      </div>
      {filtered &&
        filtered.map((element) => {
          return (
            <div style={{ padding: '2rem' }} id={element.anchor}>
              <AnchorLink href={`#${element.anchor}`}>
                <p style={{ fontWeight: 'bold' }}>
                  {element.topic} - {element.subtopic}
                </p>
              </AnchorLink>
              <img
                src={element.image}
                style={{ width: '100%', padding: '1rem 0 ' }}
              />
              <Share
                shareUrl={
                  'https://analitica.hablemosdelperu.com#' + element.anchor
                }
                text={`${element.topic} - ${element.subtopic}`}
                imageUrl={element.image}
              />
            </div>
          );
        })}
    </>
  );
};

export default Element;
