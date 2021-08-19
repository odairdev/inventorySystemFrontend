import { FormEvent, useState } from "react";

import homeImg from "../../assets/home.jpg";
import styles from "./styles.module.scss";
import { useAuth } from "../../hooks/useAuth";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  function handleSignIn(e: FormEvent) {
    e.preventDefault();

    signIn({ email, password });
  }

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
          <form className={styles.loginForm} onSubmit={handleSignIn}>
            <label>Email</label>
            <input
              type="text"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Entrar</button>
          </form>
        </div>
      </main>
    </div>
  );
}
