import bundler from "../../bundler";
import { ActionType } from "../action-types";
import type { Middleware } from "./middleware";

let timer: any
const bundlerMiddleware: Middleware = ({ getState, dispatch }) => (next) => (action) => {
    next(action)
    if (action.type !== ActionType.UPDATE_CELL) {
        return
    }
console.log(getState)
    const { cells } = getState()
    const cell = cells?.data[action.payload.id]
    if (cell?.type === "text") {
        return
    }
    clearTimeout(timer);
    timer = setTimeout(async () => {
        console.log("start bundling")
        const result = await bundler(action.payload.content || '')
        dispatch({
            type: ActionType.BUNDLE_CREATED,
            payload: {
                cellId: action.payload.id,
                bundle: result
            }
        })
        console.log("result", result)
    }, 900)
};

export default bundlerMiddleware;

