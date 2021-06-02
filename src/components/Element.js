import React, { useState } from 'react';
import corrupcion01 from '../assets/tempDB/corrupcion01.png';
import Button from './Button';

const Element = () => {
  const element = {
    image: corrupcion01,
    topic: 'Corrupción',
    subTopic: 'Costo histórico de la corrupción.',
  };

  const shareData = {
    title: 'MDN',
    text: 'Learn web development on MDN!',
    url: 'https://developer.mozilla.org',
  };

  return (
    <div style={{ padding: '1rem' }}>
      <p style={{ fontWeight: 'bold' }}>
        {element.topic} - {element.subTopic}
      </p>
      <img src={element.image} style={{ width: '100%', padding: '0' }} />
      <Button
        config={{
          params: {
            title: 'My share',
            text: 'Check out this amazing react-share-api library',
            url: 'https://github.com/marcolanaro/react-web-share-api',
          },
          /* tslint:disable-next-line:no-console */
          onShareSuccess: () => console.log('Success'),
          /* tslint:disable-next-line:no-console */
        }}
      />
    </div>
  );
};

export default Element;
