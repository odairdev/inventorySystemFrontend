import { CreateNewForm } from "../../components/CreateNewForm";
import { MainContainer } from "../../components/MainContainer";
import { MainTable } from "../../components/MainTable";

export function Inventory() {

    return (
        <MainContainer>
            <CreateNewForm isProduct={false} />
            <MainTable isProduct={false}/>
        </MainContainer>
    )
}