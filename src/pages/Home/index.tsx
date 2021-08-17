
import homeImg from '../../assets/home.jpg'
import styles from './styles.module.scss'

export function Home() {
    return (
        <div className={styles.homeContainer}>
            <aside>
                <img src={homeImg} alt="Logo da empresa" />
                <div className={styles.homeImgOverlay}></div>
                <h1>Sistema de Estoque</h1>
            </aside>
            <main className={styles.login}>
                <div>
                    <h1>Login</h1>
                    <form className={styles.loginForm}>
                        <label>Email</label>
                        <input type="text" placeholder="exemplo@email.com"/>

                        <label>Password</label>
                        <input type="password" placeholder="************"/>

                        <button type="button">Entrar</button>
                    </form>
                </div>
            </main>
        </div>
    )
}