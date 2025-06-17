import { ActionType } from "./action-types";
import type { Action } from "./actions";
import reducers from "./reducers";
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: reducers,
})

const n:Action = {
    type:ActionType.INSERT_CELL_BEFORE,
    payload:{
        id:null,
        type:'code'
    }
}
store.dispatch(n)
const nn:Action = {
    type:ActionType.INSERT_CELL_BEFORE,
    payload:{
        id:null,
        type:'text'
    }
}
store.dispatch(nn)
