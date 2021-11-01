import React, { useState } from 'react';
import { Input } from 'semantic-ui-react';
import { HashLink as Link } from 'react-router-hash-link';
import { constitucion } from '../assets/tempDB/constitutionDiagramDB';

const SearchBar = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleTerm = (e) => {
    const text = e.target.value;
    if (text.length > 3) {
      lookupJson(text, constitucion[0].objects);
    } else {
      setResults([]);
    }
    setTerm(text);
  };

  let resultsArray = [];

  const lookupJson = (
    term,
    object,
    grandParentArticle = 0,
    isChild = false,
  ) => {
    object.forEach((e) => {
      grandParentArticle = !isChild ? e.article : grandParentArticle;
      if (e.content) {
        if (e.content.includes(term)) {
          resultsArray.push({
            article: grandParentArticle,
            content: e.content,
          });
        }
      }
      if (e.elements && e.elements.length) {
        lookupJson(term, e.elements, grandParentArticle, true);
      } else {
        setResults(resultsArray);
      }
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      <Input
        loading={false}
        style={{ margin: '10px 0' }}
        fluid
        icon="search"
        size="huge"
        placeholder="Buscar..."
        value={term}
        onChange={(e) => handleTerm(e)}
      />
      {results
        ? results.map((r) => {
            const anchor = encodeURI(r.article + '-0');
            return (
              <div
                style={{
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: 50,
                  zIndex: 1000,
                  width: '100%',
                }}>
                <p style={{ padding: 10 }}>
                  <Link
                    to={{ pathname: '/', hash: `#${anchor}` }}
                    scroll={(el) =>
                      el.scrollIntoView({ behavior: 'auto', block: 'start' })
                    }>
                    {`Artículo ${r.article} - ...${r.content}...`}
                  </Link>
                </p>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default SearchBar;
