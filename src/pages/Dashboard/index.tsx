import { useAuth } from "../../hooks/useAuth";
import { UserProps } from '../../contexts/auth'
import { MainContainer } from "../../components/MainContainer";

import styles from './styles.module.scss'
import { Link } from "react-router-dom";

export function Dashboard() {
  const { user } = useAuth()
  const userString: UserProps = JSON.parse(JSON.stringify(user))

  return (
    <MainContainer>
      <div className={styles.container}>
        <h1>Usuário: {userString.name}</h1>
        <section className={styles.cards}>
          <div className={styles.card}>
            <Link to='/products' >Produtos</Link>
          </div>
          <div className={styles.card}>
            <Link to='/inventory' >Estoque</Link>
          </div>
        </section>
      </div>
      
    </MainContainer>
  );
}
