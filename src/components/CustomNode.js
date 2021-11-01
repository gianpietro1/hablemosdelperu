import React from 'react';
import { HashLink } from 'react-router-hash-link';
import '../assets/styles/node.css';

const CustomNode = (props) => {
  const changeType = props.data.change.changeType;
  const article = props.data.article;
  const grandParentArticle = props.data.grandParentArticle;

  const defineStyle = (styleData) => {
    const finalStyle = {};
    if (styleData === 'addition') {
      finalStyle.background = '#249225';
    } else if (styleData === 'modification') {
      finalStyle.background = '#dd571c';
    } else if (styleData === 'removal') {
      finalStyle.background = '#b01030';
      finalStyle.textDecoration = 'line-through';
    } else {
      finalStyle.background = '#1e3f5a';
    }
    return finalStyle;
  };

  const calculatedStyle = defineStyle(changeType);
  const capitalizedContent =
    props.content[0].toUpperCase() + props.content.slice(1);
  const anchor = encodeURI(grandParentArticle + '-' + article);

  return (
    <div
      id={anchor}
      className="node"
      style={{
        background: calculatedStyle.background,
      }}>
      <div
        className="nodeText"
        style={{
          textDecoration: calculatedStyle.textDecoration,
        }}>
        <HashLink
          to={{ pathname: '/texto', hash: `#${anchor}` }}
          scroll={(el) =>
            el.scrollIntoView({ behavior: 'auto', block: 'start' })
          }>
          {capitalizedContent}
        </HashLink>
      </div>
    </div>
  );
};

export default CustomNode;
