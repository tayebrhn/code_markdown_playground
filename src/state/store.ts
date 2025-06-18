import { ActionType } from "./action-types";
import type { Action } from "./actions";
import bundlerMiddleware from "./middlewares/bundle-middleware";
import reducers from "./reducers";
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(bundlerMiddleware as any)
    },
})

const n: Action = {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'code'
    }
}
store.dispatch(n)
const nn: Action = {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
        id: null,
        type: 'text'
    }
}
store.dispatch(nn)
