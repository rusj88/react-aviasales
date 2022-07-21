import axios from 'axios';

export const selectAllTransferOptions = () => ({ type: 'ALL' });

export const selectNoTransfer = () => ({ type: 'NONE' });

export const selectOneTransfer = () => ({ type: 'ONE' });

export const selectTwoTransfer = () => ({ type: 'TWO' });

export const selectThreeTransfer = () => ({ type: 'THREE' });

export const sortCheap = () => ({ type: 'CHEAP' });

export const sortFast = () => ({ type: 'FAST' });

export const sortOptimal = () => ({ type: 'OPTIMAL' });

export const FETCH_TICKETS_REQUEST = 'FETCH_TICKETS_REQUEST';
export const FETCH_TICKETS_SUCCESS = 'FETCH_TICKETS_SUCCESS';
export const FETCH_TICKETS_FAILURE = 'FETCH_TICKETS_FAILURE';

export const fetchTicketsRequest = () => ({ type: FETCH_TICKETS_REQUEST });

export const fetchTicketsSuccess = (tickets) => ({ type: FETCH_TICKETS_SUCCESS, payload: tickets });

export const fetchTicketsFailure = (error) => ({ type: FETCH_TICKETS_FAILURE, payload: error });

export const getSearchId = () =>
  axios.get('https://aviasales-test-api.kata.academy/search').then((response) => response.data.searchId);

export const fetchTickets = (searchId) => (dispatch) => {
  dispatch(fetchTicketsRequest());
  axios
    .get(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
    .then((response) => {
      dispatch(fetchTicketsSuccess(response.data));
    })
    .catch((error) => {
      if (error.response.status === 500) {
        setTimeout(() => {
          fetchTickets(searchId)(dispatch);
        }, 3000);
      }
      dispatch(fetchTicketsFailure(error.response.status));
    });
};
