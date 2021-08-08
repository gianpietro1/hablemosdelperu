import React, { useContext, useEffect } from 'react';
import { readString } from 'react-papaparse';
import { HashLink } from 'react-router-hash-link';
import { useHistory } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import { Context as MenuContext } from '../context/MenuContext';

import { db } from './db.js';
import '../assets/styles/text.css';

const Text = () => {
  const { changeActiveMenu } = useContext(MenuContext);

  useEffect(() => {
    changeActiveMenu('text');
  }, []);

  let history = useHistory();
  const dbObject = readString(db);
  const processDB = () => {
    let tableRow = [];
    return dbObject.data.map((e, i, arr) => {
      if (!e[1]) {
        return (
          <Table.Row key={e[0]}>
            <Table.Cell
              verticalAlign="top"
              colSpan={2}
              textAlign="center"
              style={{
                fontWeight: e[0].includes('TÍTULO') ? 'bold' : 'normal',
              }}>
              {e[0]}
            </Table.Cell>
          </Table.Row>
        );
      }
      const anchor = encodeURI(e[0] + '-' + e[1]);
      const tableActiveRow = [
        <div
          className={
            anchor === history.location.hash.substring(1)
              ? 'activeText'
              : 'divText'
          }>
          <HashLink
            to={`/#${anchor}`}
            scroll={(el) =>
              el.scrollIntoView({ behavior: 'auto', block: 'end' })
            }>
            {e[2]}
          </HashLink>
        </div>,
      ];
      if (arr[i + 1] && arr[i + 1][0] === e[0]) {
        // accumulate in a separate array and return nothing
        tableRow.push(tableActiveRow);
        return true;
      } else if (!tableRow.length) {
        // return current one
        return (
          <Table.Row id={anchor} key={e[2]}>
            <Table.Cell verticalAlign="top" textAlign="center">
              {e[0]}
            </Table.Cell>
            <Table.Cell>{tableActiveRow}</Table.Cell>
          </Table.Row>
        );
      } else {
        // merge accumulated, reset and return
        let copiedTableRow = tableRow;
        tableRow = [];
        return (
          <Table.Row id={anchor} key={e[2]}>
            <Table.Cell verticalAlign="top" textAlign="center">
              {e[0]}
            </Table.Cell>
            <Table.Cell>{copiedTableRow}</Table.Cell>
          </Table.Row>
        );
      }
    });
  };

  return (
    <Table celled structured>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Artículo</Table.HeaderCell>
          <Table.HeaderCell>Contenido</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{processDB()}</Table.Body>
    </Table>
  );
};

export default Text;
