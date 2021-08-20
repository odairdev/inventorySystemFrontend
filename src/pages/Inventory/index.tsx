import { CreateNewForm } from "../../components/CreateNewForm";
import { MainContainer } from "../../components/MainContainer";
import { MainTable } from "../../components/MainTable";
import { ModalWindow } from "../../components/Modal";

export function Inventory() {
  return (
    <MainContainer>
      <ModalWindow isProduct={false}/>
      <CreateNewForm isProduct={false} />
      <MainTable isProduct={false} />
    </MainContainer>
  );
}
