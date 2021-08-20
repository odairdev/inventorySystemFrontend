import { FormEvent, useState } from "react";
import * as Yup from 'yup'

import homeImg from "../../assets/home.jpg";
import styles from "./styles.module.scss";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
};

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

  async function handleSignUp(e: FormEvent) {
    e.preventDefault();

    const data: SignUpFormData = {
      name,
      email,
      password
    }

    const schema = Yup.object().shape({
      name: Yup.string()
        .required('Nome obrigatório'),
      email: Yup.string()
        .required('E-mail obrigatório')
        .email('Digite um e-mail válido'),
      password: Yup.string()
        .min(6, 'Mínimo 6 dígitos'),
    });

    try {

      await schema.validate(data, {
        abortEarly: false,
      });

    } catch(err: any) {
      const errors: string[] = err.errors
      let errorMessages = ''

      errors.map(error => {
        if(error === 'Mínimo 6 dígitos') {
          error = 'Senha precisa ter no mínimo 6 dígitos.'
        }
        errorMessages += ` ${error} \n`
      })

      alert(errorMessages)

      return
    }

    signUp(name, email, password)

    setEmail('')
    setPassword('')
    setRegister(false)
  }

  return (
    <div className={styles.homeContainer}>
      <aside>
        <img src={homeImg} alt="Logo da empresa" />
        <div className={styles.homeImgOverlay}></div>
        <h1>Sistema de Estoque</h1>
      </aside>
      { register ? 
        <main className={`${styles.login}`}>
            <div className={styles.registerDiv}>
              <h1>Cadastro</h1>
              <form className={styles.loginForm} onSubmit={handleSignUp}>
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