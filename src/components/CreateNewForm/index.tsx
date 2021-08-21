import { useState } from "react";
import { useCrud } from "../../hooks/useCrud";
import styles from "./styles.module.scss";

interface CreateNewFormProps {
  isProduct: boolean;
}

export function CreateNewForm({ isProduct }: CreateNewFormProps) {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);

  const { createNewProduct } = useCrud();

  return (
    <>
      {isProduct ? (
        <div className={styles.createContainer}>
          <span>Cadastrar Novo Produto</span>
          <form className={styles.createNewForm}>
            <div>
              <div>
                <label>Nome</label>
                <input
                  type="text"
                  placeholder="Produto"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Categoria</label>
                <input
                  type="text"
                  placeholder="Enlatados"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div>
                <label>Quantidade</label>
                <input
                  type="number"
                  placeholder="5"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
                <button
                  type="submit"
                  onClick={() => createNewProduct(name, category, amount)}
                >
                  Cadastrar
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.createContainer}>
          <span>Cadastrar Nova Ordem</span>
          <form className={styles.createNewForm}>
            <div>
              <div>
                <label>Tipo</label>
                <input type="text" list='type' placeholder="Entrada/Saída" />
                <datalist id='type'>
                    <option value="Entrada"></option>
                    <option value="Saída"></option>
                </datalist>
                <label>Produto</label>
                <input type="text" placeholder="Sabonete" />
              </div>
              <div>
                <label>Quantidade</label>
                <input type="number" placeholder="5" />
                <button type="submit">Cadastrar</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
