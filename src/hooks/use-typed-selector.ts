import { useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState } from "../state";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector