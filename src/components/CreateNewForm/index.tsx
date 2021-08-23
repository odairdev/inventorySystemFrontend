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
  const [type, setType] = useState<string>('')
  const [typeValue, setTypeValue] = useState<string>('Entrada')
  const [productName, setProductName] = useState('')
  const [productId, setProductId] = useState('')

  const { createNewProduct, products, createNewOrder } = useCrud();

  function typeInputOnChange(event: React.FormEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    setTypeValue(value)
    let translatedValue = 'in'

    if(value === 'Entrada') {
      translatedValue = 'in'
    } else if ( value === 'Saída') {
      translatedValue = 'out'
    }
    
    setType(translatedValue);
  }

  function productInputChange(event: React.FormEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;

    setProductName(value);

    const productFound = products.find(product => {
      return product.name === value
    })

    if(productFound) {
      setProductId(productFound.id)
    }
  }

  const clear = (event: React.FormEvent<HTMLInputElement>, inputType: string) => {
    event.currentTarget.value = "";
    if(inputType === 'type') {
      setType('')
    } else {
      setProductName('')
    }
  };

  return (
    <>
      {isProduct ? (
        <div className={styles.createContainer}>
          <span>Cadastrar Novo Produto</span>
          <form className={styles.createNewForm} onSubmit={(e) => createNewProduct(name, category, amount)}>
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
          <form className={styles.createNewForm} onSubmit={(e) => {createNewOrder(productId, type, amount)}}>
            <div>
              <div>
                <label>Tipo</label>
                <input type="text" list='type' placeholder="Entrada/Saída" value={typeValue} onChange={typeInputOnChange} onClick={(e) => clear(e, 'type')}/>
                <datalist id='type'>
                    <option value="Entrada"></option>
                    <option value="Saída"></option>
                </datalist>
                <label>Produto</label>
                <input type="text" list='productNames' placeholder="Arroz" value={productName} onChange={productInputChange} onClick={(e) => clear(e, 'productName')}/>
                <datalist id='productNames'>
                  {products.map(product => {
                    return(
                      <option value={product.name}></option>
                    )
                  })}
                </datalist>
              </div>
              <div>
                <label>Quantidade</label>
                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="5" />
                <button type="submit">Cadastrar</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
