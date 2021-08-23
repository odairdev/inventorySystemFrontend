import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { useCrud } from "../../hooks/useCrud";
import styles from "./styles.module.scss";
import ReactPaginate from "react-paginate";
import { InventoryOrders } from "../../contexts/crud";

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
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { products, inventoryOrders, deleteProduct, deleteOrder } = useCrud();
  const { handleOpenModal, setSelectedProduct, setSelectedOrder } = useContext(ModalContext);

  const PER_PAGE = 5;
  const offset = currentPage * PER_PAGE;

  const productsPageCount = Math.ceil(products.length / PER_PAGE);
  const productsPageData = products.slice(offset, offset + PER_PAGE);

  const ordersPageCount = Math.ceil(inventoryOrders.length / PER_PAGE);
  const ordersPageData = inventoryOrders.slice(offset, offset + PER_PAGE);

  function handlePageClick(data: any) {
    setCurrentPage(data.selected)
  }

  function translateOrdertype(orderType: string) {
    if (orderType === "in") {
      return "Entrada";
    } else {
      return "Saída";
    }
  }

  useEffect(() => {
    if (isProduct) {
      isDataAvailable(products);
    } else {
      isDataAvailable(inventoryOrders);
    }
  }, [isProduct, products, inventoryOrders]);

  function handleEditProduct(product: ProductsInterface) {
    setSelectedProduct(product)
    handleOpenModal()
  }

  function handleEditOrder(order: InventoryOrders) {
    setSelectedOrder(order)
    handleOpenModal()
  }

  return (
    <>
      {isProduct ? (
        <>
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
                {productsPageData.map((product) => {
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
                            onClick={() => handleEditProduct(product)}
                          >
                            Editar
                          </button>
                          <button type="button" className={styles.delete} onClick={() => deleteProduct(product.id)}>
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
        <ReactPaginate
        pageCount={productsPageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        previousLabel='←'
        nextLabel='→'
        containerClassName={styles.pagination}
        previousLinkClassName={styles.pagination__link}
        nextLinkClassName={styles.pagination__link}
        disabledClassName={styles.pagination__linkDisabled}
        activeClassName={styles.pagination__linkActive}
      />
        </>
      ) : (
        <>
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
                {ordersPageData.map((order) => {
                  return (
                    <tr key={order.id}>
                      <td>{order.product.name}</td>
                      <td className={styles.type}>
                        {translateOrdertype(order.type)}
                      </td>
                      <td>{order.order_amount}</td>
                      <td>12/5/2015</td>
                      <td>
                        <div className={styles.actionsCell}>
                          <button
                            type="button"
                            className={styles.edit}
                            onClick={() => handleEditOrder(order)}
                          >
                            Editar
                          </button>
                          <button type="button" className={styles.delete} onClick={()=> deleteOrder(order.id)}>
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
        <ReactPaginate
        pageCount={ordersPageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        previousLabel='←'
        nextLabel='→'
        containerClassName={styles.pagination}
        previousLinkClassName={styles.pagination__link}
        nextLinkClassName={styles.pagination__link}
        disabledClassName={styles.pagination__linkDisabled}
        activeClassName={styles.pagination__linkActive}
      />
      </>
      )}
    </>
  );
}
