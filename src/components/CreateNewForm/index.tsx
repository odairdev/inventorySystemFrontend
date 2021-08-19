
import styles from './styles.module.scss'


export function CreateNewForm() {
    return (
        <div className={styles.createContainer}>
            <span>Cadastrar Novo Produto: </span>
            <form className={styles.createNewForm}>
                <label >Nome: </label>
                <input type="text" placeholder='Produto' />
                <label >Categoria: </label>
                <input type="text" placeholder='Enlatados' />
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}