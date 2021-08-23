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
    e: React.FormEvent<HTMLFormElement>,
    productId: string,
    name: string,
    category: string,
    amount: number
  ) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  createNewOrder: (
    productId: string,
    type: string,
    amount: number
  ) => Promise<void>;
  updateOrder: (e: React.FormEvent<HTMLFormElement>,
    orderId: string,
    productId: string,
    type: 'in' | 'out',
    order_amount: number) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
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
      return;
    }

    if (amount <= 0 || Number.isInteger(amount) == false) {
      alert("Quantidade precisa ser maior que zero e um número inteiro");
    }

    const response = api.post("products", { name, category, amount });

    const { product } = (await response).data;

    setProducts([...products, product]);

    alert("Produto Criado com sucesso");
  }

  async function updateProduct(
    e: React.FormEvent<HTMLFormElement>,
    productId: string,
    name: string,
    category: string,
    amount: number
  ) {
    e.preventDefault();

    if (
      name.length === 0 ||
      category.length === 0 ||
      name.length > 20 ||
      category.length === 20
    ) {
      alert("Nome/Categoria precisam ter de 1 a 20 letras.");
      return;
    }

    if (amount <= 0 || Number.isInteger(amount) == false) {
      alert("Quantidade precisa ser maior que zero e um número inteiro");
    }

    await api
      .put("products", { productId, name, category, amount })
      .catch((error) => console.log(error));

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

  async function deleteProduct(productId: string) {
    if (!window.confirm("Você quer mesmo deletar esse produto?")) {
      return;
    }

    await api
      .delete(`/products/${productId}`)
      .catch((error) => console.log(error.message));

    const newProductsList = products.filter(
      (product) => product.id !== productId
    );

    setProducts(newProductsList);
  }

  async function createNewOrder(
    productId: string,
    type: string,
    amount: number
  ) {
    if (amount <= 0 || Number.isInteger(amount) == false) {
      alert("Quantidade precisa ser maior que zero e um número inteiro");
    }

    const product = products.find(product => product.id === productId)

    if(!product) {
      alert('Produto não encontrado');
      return
    }

    if(type === 'out' && amount > product?.amount) {
      alert('Ordem de saída com quantidade maior do que em estoque.')
      return
    }

    const response = api.post("/inventory", {
      productId,
      type,
      order_amount: amount,
    });

    const { order } = (await response).data;

    setInventoryOrders([...inventoryOrders, order]);

    alert("Ordem Criada com sucesso");
  }

  async function updateOrder(
    e: React.FormEvent<HTMLFormElement>,
    orderId: string,
    productId: string,
    type: 'in' | 'out',
    order_amount: number
  ) {
    e.preventDefault();

    if (order_amount <= 0 || Number.isInteger(order_amount) == false) {
      alert("Quantidade precisa ser maior que zero e um número inteiro");
      return
    }

    const product = products.find(product => product.id === productId)

    if(!product) {
      alert('Produto não encontrado');
      return
    }

    if(type === 'out' && order_amount > product?.amount) {
      alert('Ordem de saída com quantidade maior do que em estoque.')
      return
    }

    await api
      .put("products", { orderId, type, order_amount })
      .catch((error) => console.log(error));

    const newOrdersArray = [...inventoryOrders];

    const ordertIndex = newOrdersArray.findIndex(
      (newOrder) => newOrder.id === orderId
    );

    newOrdersArray[ordertIndex].type = type;
    newOrdersArray[ordertIndex].order_amount = order_amount;

    setInventoryOrders([...newOrdersArray]);

    alert("Ordem alterada com sucesso");
  }

  async function deleteOrder(orderId: string) {
    if (!window.confirm("Você quer mesmo deletar essa ordem?")) {
      return;
    }

    await api.delete(`/inventory/${orderId}`);

    const newOrdersList = inventoryOrders.filter(
      (order) => order.id !== orderId
    );

    setInventoryOrders(newOrdersList);
  }

  return (
    <CrudContext.Provider
      value={{
        products,
        inventoryOrders,
        createNewProduct,
        updateProduct,
        deleteProduct,
        createNewOrder,
        updateOrder,
        deleteOrder,
      }}
    >
      {children}
    </CrudContext.Provider>
  );
}
