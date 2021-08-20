import { CreateNewForm } from "../../components/CreateNewForm";
import { MainContainer } from "../../components/MainContainer";
import { MainTable } from "../../components/MainTable";

export function Products() {
  return (
    <MainContainer>
      <CreateNewForm isProduct />
      <MainTable isProduct />
    </MainContainer>
  );
}
