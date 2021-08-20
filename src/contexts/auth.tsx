import { ReactNode, useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import history from "../routes/history";
import api from "../services/api";

export interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface AuthContextData {
  loading: boolean;
  signed: boolean;
  user: object | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: ( name: string, email: string, password: string) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadStoragedData() {
      const storagedUser = localStorage.getItem("@InventoryAuth:user");
      // const storagedToken = localStorage.getItem("@InventoryAuth:token");

      if (storagedUser) {
        // api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

        new Promise((promise) => setTimeout(promise, 2000));

        const parsedUser = JSON.parse(storagedUser);

        setUser(parsedUser);
      }
    }

    loadStoragedData();
    setLoading(false);
  }, []);

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post("/auth", { email, password });

      setUser(response.data.user);

      api.defaults.headers.common.authentication = `Bearer ${response.data.token}`;

      const token = JSON.stringify(response.data.token)

      localStorage.setItem(
        "@InventoryAuth:user",
        (JSON.stringify(response.data.user))
      );
      localStorage.setItem(
        "@InventoryAuth:token",
        (token.slice(1, token.length - 1))
      );

      history.push("/dashboard");
    } catch(err) {
      alert(err.response.data.error)
    }
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
    history.push("/dashboard");
  }

  async function signUp(name: string, email: string, password: string) {



    try {
      await api.post('/users', {name, email, password})
      
      alert('Usuário criado com sucesso')
    } catch(err) {
      alert(err)
    }    
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, loading, user, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
