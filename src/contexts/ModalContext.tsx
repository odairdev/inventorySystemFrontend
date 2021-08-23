import { createContext, ReactNode, useState } from "react";
import { InventoryOrders, ProductsInterface } from "./crud";

interface ModalContextProviderProps {
  children: ReactNode;
}

interface ModalContextData {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  selectedProduct: ProductsInterface;
  setSelectedProduct: (product: ProductsInterface) => void;
  setSelectedOrder: (order: InventoryOrders) => void;
  selectedOrder: InventoryOrders;
  handleCloseModal: () => void;
}

export const ModalContext = createContext<ModalContextData>(
  {} as ModalContextData
);

export function ModalContextProvider({ children }: ModalContextProviderProps) {
    const [isModalOpen, setIsModalOpen] =
    useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductsInterface>({} as ProductsInterface)
    const [selectedOrder, setSelectedOrder] = useState<InventoryOrders>({} as InventoryOrders)

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setSelectedProduct({} as ProductsInterface)
    setSelectedOrder({} as InventoryOrders)
    setIsModalOpen(false);    
  }

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        selectedProduct,
        setSelectedProduct,
        setSelectedOrder,
        selectedOrder,
        handleOpenModal,
        handleCloseModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
