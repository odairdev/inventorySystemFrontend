import { createContext, ReactNode, useState } from "react";

interface ModalContextProviderProps {
  children: ReactNode;
}

interface ModalContextData {
  isModalOpen: boolean;
  selectedOption: [];
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

export const ModalContext = createContext<ModalContextData>(
  {} as ModalContextData
);

export function ModalContextProvider({ children }: ModalContextProviderProps) {
    const [isModalOpen, setIsModalOpen] =
    useState(false);
    const [selectedOption, setSelectedOption] = useState<[]>([])

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        selectedOption,
        handleOpenModal,
        handleCloseModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
