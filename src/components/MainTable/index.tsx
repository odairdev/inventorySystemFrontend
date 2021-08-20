import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { useCrud } from "../../hooks/useCrud";
import styles from "./styles.module.scss";

interface MainTableProps {
  isProduct: boolean;
}

export interface ProductsInterface {
  id: string;
  name: string;
  category: string;
  amount: number;
  created_at: Date;
}

export function MainTable({ isProduct }: MainTableProps) {
  const [dataAvailable, isDataAvailable] = useState<any | null>(null);
  const { products, inventoryOrders, updateProduct } = useCrud();
  const { handleOpenModal } = useContext(ModalContext);

  function translateOrdertype(orderType: string) {
    if(orderType === 'in') {
      return 'Entrada'
    } else {
      return 'Saída'
    }
  }

  function handleProductModal() {
    handleOpenModal();
  }

  useEffect(() => {
    if (isProduct) {
      isDataAvailable(products);
    } else {
      isDataAvailable(inventoryOrders);
    }
  }, [isProduct, products, inventoryOrders]);

  return (
    <>
      {isProduct ? (
        <table>
          {dataAvailable ? (
            <>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Quantidade</th>
                  <th>Adicionado</th>
                  <th style={{ textAlign: "center" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.amount}</td>
                      <td>
                        {Intl.DateTimeFormat("pt-BR").format(
                          new Date(product.created_at)
                        )}
                      </td>
                      <td>
                        <div className={styles.actionsCell}>
                          <button
                            type="button"
                            className={styles.edit}
                            onClick={handleOpenModal}
                          >
                            Editar
                          </button>
                          <button type="button" className={styles.delete}>
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>{" "}
            </>
          ) : (
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Sem dados disponíveis</th>
              </tr>
            </thead>
          )}
        </table>
      ) : (
        <table>
          {dataAvailable ? (
            <>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Tipo</th>
                  <th>Quantidade</th>
                  <th>Data</th>
                  <th style={{ textAlign: "center" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {inventoryOrders.map((order) => {
                  return (
                    <tr>
                      <td>{order.product.name}</td>
                      <td className={styles.type}>{translateOrdertype(order.type)}</td>
                      <td>{order.order_amount}</td>
                      <td>12/5/2015</td>
                      <td>
                        <div className={styles.actionsCell}>
                          <button type="button" className={styles.edit}>
                            Editar
                          </button>
                          <button type="button" className={styles.delete}>
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>{" "}
            </>
          ) : (
            <thead>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Sem dados disponíveis</th>
                </tr>
              </thead>
            </thead>
          )}
        </table>
      )}
    </>
  );
}
