import { combineReducers } from "redux";
import checkboxReducer from "./checkbox";
import sortReducer from "./sort";
import ticketsReducer from "./tickets";

const allReducers = combineReducers({
    checkbox: checkboxReducer,
    sort: sortReducer,
    tickets: ticketsReducer
});

export default allReducers;