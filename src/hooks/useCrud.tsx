import { useContext } from "react";
import { CrudContext } from "../contexts/crud";

export function useCrud() {
    const context = useContext(CrudContext)

    return context
}