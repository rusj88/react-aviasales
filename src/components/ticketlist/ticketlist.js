import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import 'antd/dist/antd.css';
import { Alert } from 'antd';
import { sortCheap, sortFast, sortOptimal, fetchTickets, getSearchId } from '../actions';
import Ticket from '../ticket';

import classes from './ticketlist.module.scss';

function TicketList({ currentSort, fnSortCheap, fnSortFast, fnSortOptimal, fnFetchTickets, ticketsData, checkboxes }) {
  const [searchId, setSearchId] = useState();
  const [ticketsShowAmount, setTicketsShowAmount] = useState(5);

  const alertStyle = {
    fontSize: '16px',
    fontWeight: '600',
    fontFamily: 'Open Sans, sans-serif',
    marginBottom: '24px',
  };

  const sortTickets = (arrayOfTickets) => {
    if (currentSort === 'cheap') {
      return arrayOfTickets.sort((prev, next) => prev.price - next.price);
    }
    if (currentSort === 'fast') {
      return arrayOfTickets.sort(
        (prev, next) =>
          prev.segments[0].duration +
          prev.segments[1].duration -
          (next.segments[0].duration + next.segments[1].duration)
      );
    }
    if (currentSort === 'optimal') {
      return arrayOfTickets;
    }
    return arrayOfTickets;
  };

  const filterTickets = (arrayOfTickets) => {
    const filtered = arrayOfTickets.filter((ticket) => {
      if (checkboxes.none && checkboxes.one && checkboxes.two && checkboxes.three) return ticket;
      if (checkboxes.none && (ticket.segments[0].stops.length === 0 || ticket.segments[1].stops.length === 0)) {
        return true;
      }
      if (checkboxes.one && (ticket.segments[0].stops.length === 1 || ticket.segments[1].stops.length === 1)) {
        return true;
      }
      if (checkboxes.two && (ticket.segments[0].stops.length === 2 || ticket.segments[1].stops.length === 2)) {
        return true;
      }
      if (checkboxes.three && (ticket.segments[0].stops.length === 3 || ticket.segments[1].stops.length === 3)) {
        return true;
      }
      return false;
    });
    return filtered;
  };

  const showTickets = (ticketsArray, amount) => {
    if (ticketsArray.length !== 0) {
      const firstSetofTickets = sortTickets(filterTickets(ticketsArray)).slice(0, amount);
      if (firstSetofTickets.length === 0) {
        return <Alert message="Рейсов, подходящих под заданные фильтры, не найдено" type="info" style={alertStyle} />;
      }
      return firstSetofTickets.map((ele) => <Ticket key={uuid()} {...ele} />);
    }
    return ticketsArray;
  };

  useEffect(() => {
    getSearchId().then((id) => setSearchId(id));
  }, []);

  useEffect(() => {
    if (searchId) {
      if (ticketsData.gotAllTickets === false) {
        fnFetchTickets(searchId);
      }
    }
  }, [searchId, ticketsData.ticketsList, fnFetchTickets, ticketsData.gotAllTickets]);

  return (
    <div className={classes['ticket-container']}>
      <ul className={classes['ticket-filter']}>
        <li>
          <button type="button" className={currentSort === 'cheap' ? classes.selected : null} onClick={fnSortCheap}>
            САМЫЙ ДЕШЕВЫЙ
          </button>
        </li>
        <li>
          <button type="button" className={currentSort === 'fast' ? classes.selected : null} onClick={fnSortFast}>
            САМЫЙ БЫСТРЫЙ
          </button>
        </li>
        <li>
          <button type="button" className={currentSort === 'optimal' ? classes.selected : null} onClick={fnSortOptimal}>
            ОПТИМАЛЬНЫЙ
          </button>
        </li>
      </ul>

      {showTickets(ticketsData.ticketsList, ticketsShowAmount)}

      <button
        type="button"
        className={classes['show-more']}
        onClick={() => setTicketsShowAmount(ticketsShowAmount + 5)}
      >
        ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  checkboxes: state.checkbox,
  currentSort: state.sort,
  ticketsData: state.tickets,
});

const mapDispatchToProps = (dispatch) => ({
  fnSortCheap: () => dispatch(sortCheap()),
  fnSortFast: () => dispatch(sortFast()),
  fnSortOptimal: () => dispatch(sortOptimal()),
  fnFetchTickets: (searchId) => dispatch(fetchTickets(searchId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketList);

TicketList.defaultProps = {
  currentSort: 'cheap',
  fnSortCheap: () => {},
  fnSortFast: () => {},
  fnSortOptimal: () => {},
  fnFetchTickets: () => {},
  ticketsData: {},
  checkboxes: {},
};

TicketList.propTypes = {
  currentSort: PropTypes.string,
  fnSortCheap: PropTypes.func,
  fnSortFast: PropTypes.func,
  fnSortOptimal: PropTypes.func,
  fnFetchTickets: PropTypes.func,
  ticketsData: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number, PropTypes.arrayOf(PropTypes.object)])
  ),
  checkboxes: PropTypes.objectOf(PropTypes.bool),
};
