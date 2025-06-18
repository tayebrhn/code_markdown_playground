import { produce } from "immer";
import { ActionType } from "../action-types";
import type { Action } from "../actions";


interface BundleState {
    [key: string]: {code: string, err: string}
}

const initState: BundleState = {

}

const reducer = produce(
    (state: BundleState = initState, action: Action) => {
        switch (action.type) {
            case ActionType.BUNDLE_CREATED:
                state[action.payload.cellId]=action.payload.bundle
                return state
            default:
                return state
        }

    }
)

export default reducer