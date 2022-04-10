import { combineReducers, createStore } from "redux";
import mainReducer from "./mainReducer";

const reducers = combineReducers({
    main: mainReducer
})

const store = createStore(
    reducers
)

export default store