import { combineReducers } from "redux";
import cellReducer from "./cell-reducer"
const reducers = combineReducers({
    cells: cellReducer
})

export default reducers

export type RootState=ReturnType<typeof reducers>