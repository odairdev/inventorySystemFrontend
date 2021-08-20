import { CreateNewForm } from "../../components/CreateNewForm";
import { MainContainer } from "../../components/MainContainer";
import { MainTable } from "../../components/MainTable";
import { ModalWindow } from "../../components/Modal";

export function Products() {
  return (
    <MainContainer>
      <ModalWindow isProduct />
      <CreateNewForm isProduct />
      <MainTable isProduct />
    </MainContainer>
  );
}
