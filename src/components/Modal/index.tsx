import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import ModalWindow from "react-modal";

import closeImg from '../../assets/close.svg'

export function Modal() {
  const { isModalOpen, handleCloseModal } = useContext(ModalContext);

  return (
    <ModalWindow
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
        <button
        type="button"
        onClick={handleCloseModal}
        className="react-modal-close"
      > <img src={closeImg} alt="Fechar" /> </button>
    </ModalWindow>
  );
}
