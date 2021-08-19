import { FormEvent, useState } from "react";

import homeImg from "../../assets/home.jpg";
import styles from "./styles.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export function SignIn() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false)

  const { signIn, signUp } = useAuth();

  function handleSignIn(e: FormEvent) {
    e.preventDefault();
    signIn(email, password);
  }

  function handleSignOut(e: FormEvent) {
    e.preventDefault();
    signUp(name, email, password)
  }

  return (
    <div className={styles.homeContainer}>
      <aside>
        <img src={homeImg} alt="Logo da empresa" />
        <div className={styles.homeImgOverlay}></div>
        <h1>Sistema de Estoque</h1>
      </aside>
      { register ? 
        <main className={styles.login}>
            <div>
              <h1>Cadastro</h1>
              <form className={styles.loginForm} onSubmit={handleSignOut}>
                <label>Nome</label>
                <input type="text" placeholder='João da Silva' value={name} onChange={(e) => setName(e.target.value)}/>
                <label>Cadastrar Email</label>
                <input
                  type="text"
                  placeholder="exemplo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label>Cadastrar Senha</label>
                <input
                  type="password"
                  placeholder="************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Cadastrar</button>
              </form>
              <span className={styles.registerButton} onClick={() => setRegister(!register)}><Link to='#' >Voltar </Link></span>
            </div>
          </main> : 
          <main className={styles.login}>
          <div>
            <h1>Login</h1>
            <form className={styles.loginForm} onSubmit={handleSignIn}>
              <label>Email</label>
              <input
                type="text"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Senha</label>
              <input
                type="password"
                placeholder="************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit">Entrar</button>
            </form>
            <span className={styles.registerButton} onClick={() => setRegister(!register)}><Link to='#' >Registrar </Link></span>
          </div>
        </main>}
    </div>
  );
}
