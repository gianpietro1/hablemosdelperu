import React, { useState } from 'react';
import corrupcion01 from '../assets/tempDB/corrupcion01.png';
import corrupcion02 from '../assets/tempDB/corrupcion01.png';
import corrupcion03 from '../assets/tempDB/corrupcion01.png';
import Share from './Share';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Element = () => {
  const elements = [
    {
      image: corrupcion01,
      topic: 'Corrupción 1',
      subTopic: 'Costo histórico de la corrupción.',
      anchor: 'corrupcion-costo-01',
    },
    {
      image: corrupcion02,
      topic: 'Corrupción 2',
      subTopic: 'Costo histórico de la corrupción.',
      anchor: 'corrupcion-costo-02',
    },
    {
      image: corrupcion03,
      topic: 'Corrupción 3',
      subTopic: 'Costo histórico de la corrupción.',
      anchor: 'corrupcion-costo-03',
    },
  ];

  const shareData = {
    title: 'MDN',
    text: 'Learn web development on MDN!',
    url: 'https://developer.mozilla.org',
  };

  return elements.map((element) => {
    return (
      <div style={{ padding: '1rem' }} id={element.anchor}>
        <AnchorLink href={`#${element.anchor}`}>
          <p style={{ fontWeight: 'bold' }}>
            {element.topic} - {element.subTopic}
          </p>
        </AnchorLink>
        <img src={element.image} style={{ width: '100%', padding: '0' }} />
        <Share
          shareUrl={'https://analitica.hablemosdelperu.com#' + element.anchor}
          text={`${element.topic} - ${element.subTopic}`}
        />
      </div>
    );
  });
};

export default Element;
