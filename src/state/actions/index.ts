import { ActionType } from "../action-types";
import type { CellType } from "../cell";
export type Direction = "up" | "down"
export interface MoveCellAction {
    type: ActionType.MOVE_CELL
    payload: {
        id: string,
        direction: Direction
    }
}

export interface DeleteCellAction {
    type: ActionType.DELETE_CELL
    payload: {
        id: string
    }
}

export interface InsertCellAfterAction {
    type: ActionType.INSERT_CELL_AFTER
    payload: {
        id: string | null
        type: CellType
    }
}

export interface UpdateCellAction {
    type: ActionType.UPDATE_CELL
    payload: {
        id: string
        content: | string | null
    }
}
export interface BundleCreatedAction {
    type: ActionType.BUNDLE_CREATED
    payload: {
        cellId: string,
        bundle: {
            code: string,
            err: string
        }
    }
}

export type Action = MoveCellAction
    | DeleteCellAction
    | InsertCellAfterAction
    | UpdateCellAction
    | BundleCreatedAction