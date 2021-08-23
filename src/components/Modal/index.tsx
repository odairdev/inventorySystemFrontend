import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import Modal from "react-modal";

import closeImg from "../../assets/close.svg";
import styles from "./styles.module.scss";
import { useState } from "react";
import { useEffect } from "react";

interface ModalWindowProps {
  isProduct: boolean;
}

export function ModalWindow({ isProduct }: ModalWindowProps) {
  const { isModalOpen, selectedProduct, selectedOrder, handleCloseModal } = useContext(ModalContext);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState("");

  function typeInputOnChange(event: React.FormEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;

    setType(value);
  }

  const clear = (event: React.FormEvent<HTMLInputElement>) => {
    event.currentTarget.value = "";
  };

  useEffect(() => {
    if(isProduct) {
      setName(selectedProduct.name)
      setCategory(selectedProduct.category)
      setAmount(selectedProduct.amount)
    } else {
      if(selectedOrder.type === 'in') {
        setType('Entrada')
      } else {
        setType('Saída')
      }
      setAmount(selectedOrder.order_amount)
    }
  }, [isProduct, selectedProduct, selectedOrder])

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      {isProduct}
      <button
        type="button"
        onClick={handleCloseModal}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar" />{" "}
      </button>
      <form className={styles.formContainer}>
        <h2>{isProduct ? "Editar Produto" : "Editar Ordem"}</h2>

        {isProduct ? (
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <>
            <input
              type="text"
              list="type"
              placeholder="Entrada/Saída"
              value={type}
              onChange={typeInputOnChange}
              onClick={clear}
            />
            <datalist id="type">
              <option value="Entrada"></option>
              <option value="Saída"></option>
            </datalist>
          </>
        )}
        <input
          type="number"
          placeholder="5"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <button type="submit">Editar Produto</button>
      </form>
    </Modal>
  );
}
