import {
    FETCH_TICKETS_REQUEST,
    FETCH_TICKETS_SUCCESS,
    FETCH_TICKETS_FAILURE
  } from '../actions'
  
  const initialState = {
    loading: false,
    ticketsList: [],
    gotAllTickets: false,
    error: ''
  }
  
  const ticketsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TICKETS_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_TICKETS_SUCCESS:
        return {
          loading: false,
          ticketsList: [...state.ticketsList, ...action.payload.tickets],
          gotAllTickets: action.payload.stop,
          error: ''
        }
      case FETCH_TICKETS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        }
      default: return state
    }
  }
  
  export default ticketsReducer