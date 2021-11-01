import React, { useContext, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Table, Popup } from 'semantic-ui-react';
import '../assets/styles/table.css';
import { Context as GovernantsContext } from '../context/GovernantsContext';
import { Context as CountriesContext } from '../context/CountriesContext';

const PoliticalMap = () => {
  const {
    state: { governants },
    getGovernants,
  } = useContext(GovernantsContext);

  const {
    state: { countries },
    getCountries,
  } = useContext(CountriesContext);

  useEffect(() => {
    getGovernants();
    getCountries();
  }, []);

  const buildYearsHeader = (governantsState) => {
    const results = governantsState.data;
    const minDateYear = new Date(
      Math.min(...results.map((e) => new Date(e.date_start))),
    ).getFullYear();

    const maxDateYear = new Date(
      Math.max(...results.map((e) => new Date(e.date_end))),
    ).getFullYear();
    const yearsList = [];
    const definitiveMinYear =
      new Date(results[0].date_start).getMonth() < 7
        ? minDateYear
        : minDateYear + 1;
    const definitiveMaxYear =
      new Date(results[results.length - 1].date_end).getMonth() > 6
        ? maxDateYear
        : maxDateYear - 1;
    for (let i = definitiveMinYear; i <= definitiveMaxYear; i++) {
      yearsList.push(i);
    }
    return (
      <Table.Row>
        <Table.HeaderCell className="firstColumn firstRow firstRowColumn">
          País
        </Table.HeaderCell>
        {yearsList.map((e) => {
          return (
            <Table.HeaderCell className="firstRow thdata" key={e}>
              {e}
            </Table.HeaderCell>
          );
        })}
      </Table.Row>
    );
  };

  const buildDataRow = (governantsState, country) => {
    const governantsStatePerCountry = governantsState.data.filter(
      (g) => g.country === country.id,
    );
    const getFlagEmoji = (countryCode) =>
      String.fromCodePoint(
        ...[...countryCode.toUpperCase()].map((x) => 0x1f1a5 + x.charCodeAt()),
      );
    return (
      <>
        <Table.Cell className="firstColumn">
          {getFlagEmoji(country.code)}
          {country.name}
        </Table.Cell>
        {governantsStatePerCountry.map((e) => {
          let cellStyle = {
            backgroundColor: '#F0F8FF',
            color: '#0d47a1',
          };
          const dateStart = new Date(e.date_start);
          const dateEnd = new Date(e.date_end);
          const yearStart =
            dateStart.getMonth() < 7
              ? dateStart.getFullYear()
              : dateStart.getFullYear() + 1;
          const yearEnd =
            dateEnd.getMonth() > 6
              ? dateEnd.getFullYear()
              : dateEnd.getFullYear() - 1;
          const yearDiff = yearEnd - yearStart;
          // console.log(
          //   e.governant_lastnames,
          //   dateStart,
          //   dateEnd,
          //   yearStart,
          //   yearEnd,
          // );
          if (e.government_type === 'dictatorship') {
            cellStyle = {
              backgroundColor: '#fff6f6',
              color: '#9f3a38',
            };
          }
          return (
            <Popup
              content={
                new Date(e.date_start).toISOString().split('T')[0] +
                ' - ' +
                new Date(e.date_end).toISOString().split('T')[0]
              }
              key={e.date_start}
              header={e.governant_names + ' ' + e.governant_lastnames}
              trigger={
                <Table.Cell
                  key={yearStart}
                  colSpan={yearDiff + 1}
                  className="tddata"
                  style={cellStyle}>
                  <a href={e.governant_link} target="_blank">
                    {e.governant_lastnames}
                  </a>
                </Table.Cell>
              }
            />
          );
        })}
      </>
    );
  };

  const buildCountries = (governantsState, countriesState) => {
    return countriesState.data.map((country) => {
      return (
        <Table.Row key={country.id} className="thdata">
          {buildDataRow(governantsState, country)}
        </Table.Row>
      );
    });
  };

  return governants.data && countries.data ? (
    <div className="tableDiv">
      <Table celled compact>
        <Table.Header>{buildYearsHeader(governants)}</Table.Header>
        <Table.Body>{buildCountries(governants, countries)}</Table.Body>
      </Table>
    </div>
  ) : null;
};

export default PoliticalMap;
