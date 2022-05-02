import { combineReducers } from "redux";

//Reducers
import loginReducers from "./loginReducers";
import motosReducers from "./motosReducers";

export default combineReducers({
    login: loginReducers,
    motos: motosReducers,
});
