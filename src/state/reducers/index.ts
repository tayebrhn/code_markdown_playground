import { combineReducers } from "redux";
import cellReducer from "./cell-reducer"
import bundlesReducer from "./bundle-reducer"
const reducers = combineReducers({
    cells: cellReducer,
    bundles: bundlesReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>