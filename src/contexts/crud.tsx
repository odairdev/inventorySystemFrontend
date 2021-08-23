import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";

interface CrudContextData {
  products: ProductsInterface[];
  inventoryOrders: InventoryOrders[];
  createNewProduct: (
    name: string,
    category: string,
    amount: number
  ) => Promise<void>;
  updateProduct: (
    productId: string,
    name: string,
    category: string,
    amount: number
  ) => Promise<void>;
  createNewOrder: (productId: string, type: string, amount: number) => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode;
}

export interface ProductsInterface {
  id: string;
  name: string;
  category: string;
  amount: number;
  created_at: Date;
}

export interface InventoryOrders {
  id: string;
  type: string;
  category: string;
  order_amount: number;
  created_at: Date;
  product: {
    id: string;
    name: string;
  };
}

export const CrudContext = createContext({} as CrudContextData);

export function CrudContextProvider({ children }: AuthProviderProps) {
  const [products, setProducts] = useState<ProductsInterface[]>([]);
  const [inventoryOrders, setInventoryOrders] = useState<InventoryOrders[]>([]);

  useEffect(() => {
    api
      .get("/products")
      .then((response) => setProducts(response.data.products));

    api
      .get("/inventory")
      .then((response) => setInventoryOrders(response.data.orders));
  }, []);

  async function createNewProduct(
    name: string,
    category: string,
    amount: number
  ) {

    if (
      name.length === 0 ||
      category.length === 0 ||
      name.length > 20 ||
      category.length === 20
    ) {
      alert("Nome/Categoria precisam ter de 1 a 20 letras.");
      return
    }

    if(amount <= 0 || Number.isInteger(amount) == false) {
      alert('Quantidade precisa ser maior que zero e um número inteiro')
    }

    const response = api.post("products", { name, category, amount });

    const { product } = (await response).data;

    setProducts([...products, product]);

    alert("Produto Criado com sucesso");
  }

  async function updateProduct(
    productId: string,
    name: string,
    category: string,
    amount: number
  ) {
    await api.put("products", { productId, name, category, amount });

    const newProductsArray = [...products];

    const productIndex = newProductsArray.findIndex(
      (newProduct) => newProduct.id === productId
    );

    newProductsArray[productIndex].name = name;
    newProductsArray[productIndex].category = category;
    newProductsArray[productIndex].amount = amount;

    setProducts([...newProductsArray]);

    alert("Produto alterado com sucesso");
  }

  async function createNewOrder(
    productId: string,
    type: string,
    amount: number) {
      
      if(amount <= 0 || Number.isInteger(amount) == false) {
        alert('Quantidade precisa ser maior que zero e um número inteiro')
      }

      const response = api.post('/inventory', {productId, type, order_amount: amount})

      const { order } = (await response).data;

      setProducts([...inventoryOrders, order]);

      alert("Ordem Criada com sucesso");
  }

  return (
    <CrudContext.Provider
      value={{ products, inventoryOrders, createNewProduct, updateProduct, createNewOrder }}
    >
      {children}
    </CrudContext.Provider>
  );
}
