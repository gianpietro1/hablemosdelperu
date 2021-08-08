import React, { useState } from 'react';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import { Button, Checkbox } from 'semantic-ui-react';
import CustomNode from './CustomNode';
import '../assets/styles/diagram.css';

const MainDiagram = ({ object, parentSkipRemoved, toggleParentRemoval }) => {
  const [skipRemoved, setSkipRemoved] = useState(parentSkipRemoved);
  const initialSchema = createSchema({
    nodes: [],
    links: [],
  });

  const camalize = (str) => {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  };

  const insertElement = (
    id,
    content,
    parent,
    label,
    change,
    level,
    index,
    parentIndex,
    grandParentIndex,
    article,
    grandParentArticle,
    elementMaxSizes,
    parentY,
  ) => {
    const xPixels = 320;
    const yPixels = 50;
    const elementAccumulatedSizes =
      grandParentIndex === 0
        ? 0
        : elementMaxSizes
            .slice(0, [grandParentIndex])
            .reduce((partial_sum, a) => partial_sum + a, 0);
    const x = 10 + level * xPixels;
    const y =
      level === 0
        ? grandParentIndex === 0
          ? yPixels * 1
          : yPixels * (elementAccumulatedSizes + 1)
        : grandParentIndex === 0
        ? yPixels * index + parentY
        : yPixels * index + parentY;

    initialSchema.nodes.push({
      id,
      coordinates: [x, y],
      content,
      render: CustomNode,
      data: change ? { change, article, grandParentArticle } : null,
    });
    if (id !== parent) {
      initialSchema.links.push({
        input: parent,
        output: id,
        label,
        readonly: true,
        className: 'link',
      });
    }
    return y;
  };

  const preCalculate = (
    object,
    childElementSizes = [],
    childElementCount = 1,
    grandParentIndex = 0,
    isChild,
  ) => {
    if (!isChild) {
      childElementCount = 0;
    } else {
      childElementCount =
        object.length > childElementCount ? object.length : childElementCount;
      childElementSizes[grandParentIndex] = childElementCount;
    }
    object.forEach((e, index) => {
      grandParentIndex = !isChild ? index : grandParentIndex;
      e.id = e.id ? e.id : camalize(e.content);
      if (e.elements && e.elements.length) {
        preCalculate(
          e.elements,
          childElementSizes,
          childElementCount,
          grandParentIndex,
          true,
        );
      }
    });
    return childElementSizes;
  };

  const elementMaxSizes = preCalculate(object);

  const buildSchema = (
    object,
    parentId,
    isChild = false,
    parentIndex = 0,
    grandParentIndex = 0,
    article = 0,
    grandParentArticle = 1,
    level = 0,
    parentY = 0,
  ) => {
    if (isChild) {
      level += 1;
    }
    object.forEach((e, index, arr) => {
      // Skip removed from previous
      if (skipRemoved && e.change.changeType === 'removal') {
        return;
      }
      grandParentIndex = !isChild ? index : grandParentIndex;
      grandParentArticle = !isChild ? e.article : grandParentArticle;
      article = isChild ? (e.article !== null ? e.article : 0) : 0;
      e.id = e.id ? e.id : camalize(e.content);
      const accumulatedY = insertElement(
        e.id,
        e.content,
        parentId || e.id,
        e.arrowTextToElements,
        e.change,
        level,
        index,
        parentIndex,
        grandParentIndex,
        article,
        grandParentArticle,
        elementMaxSizes,
        parentY,
      );
      if (e.elements && e.elements.length) {
        buildSchema(
          e.elements,
          e.id,
          true,
          index,
          grandParentIndex,
          article,
          grandParentArticle,
          level,
          accumulatedY,
        );
      }
    });
    level = 0;
  };

  const [schema, { onChange }] = useSchema(initialSchema);

  buildSchema(object);

  const handleRemoval = () => {
    setSkipRemoved(!skipRemoved);
    toggleParentRemoval();
  };

  return (
    <div className="canvas">
      <Button
        toggle
        active={!skipRemoved}
        onClick={handleRemoval}
        className="toggleRemovedButton">
        <Checkbox checked={!skipRemoved} /> Incluir elementos removidos
      </Button>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

export default MainDiagram;
