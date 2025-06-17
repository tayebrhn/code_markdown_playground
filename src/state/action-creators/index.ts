import { ActionType } from "../action-types"
import type { DeleteCellAction, Direction, InsertCellBeforeAction, MoveCellAction, UpdateCellAction } from "../actions"
import type { CellType } from "../cell"

export const updateCell = (id: string, content: string|undefined): UpdateCellAction => {
    return {
        type: ActionType.UPDATE_CELL,
        payload: {
            id,
            content
        }
    }
}
export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type: ActionType.DELETE_CELL,
        payload: {
            id
        }
    }
}
export const moveCell = (id: string, direction: Direction): MoveCellAction => {
    return {
        type: ActionType.MOVE_CELL,
        payload: {
            id,
            direction
        }
    }
}
export const insertCellBefore = (id: string, cell: CellType): InsertCellBeforeAction => {
    return {
        type: ActionType.INSERT_CELL_BEFORE,
        payload: {
            id,
            type: cell
        }
    }
}