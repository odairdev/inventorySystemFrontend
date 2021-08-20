import { useAuth } from "../../hooks/useAuth";
import { UserProps } from '../../contexts/auth'
import { MainContainer } from "../../components/MainContainer";

import styles from './styles.module.scss'
import { Link } from "react-router-dom";

export function Dashboard() {
  const { user } = useAuth()
  const userString: UserProps = JSON.parse(JSON.stringify(user))

  function cardLink(path: string) {
    window.location.pathname = ``
  }

  return (
    <MainContainer>
      <div className={styles.container}>
        <h1>Usuário: {userString.name}</h1>
        <section className={styles.cards}>
            <Link to='/products' className={styles.card} >Produtos</Link>
            <Link to='/inventory' className={styles.card} >Estoque</Link>
        </section>
      </div>
      
    </MainContainer>
  );
}
