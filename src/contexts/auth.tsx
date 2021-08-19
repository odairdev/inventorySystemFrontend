import { ReactNode, useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import history from "../routes/history";
import api from "../services/api";

interface UserProps {
  email: string;
  password: string;
}

interface AuthContextData {
  loading: boolean;
  signed: boolean;
  user: object | null;
  signIn: ({ email, password }: UserProps) => Promise<void>;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadStoragedData() {
      const storagedUser = localStorage.getItem("@InventoryAuth:user");
      const storagedToken = localStorage.getItem("@InventoryAuth:token");

      if (storagedUser && storagedToken) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

        new Promise((promise) => setTimeout(promise, 1000));

        const parsedUser = JSON.parse(storagedUser);

        setUser(parsedUser);
      }
    }

    loadStoragedData();
    setLoading(false);
  }, []);

  async function signIn({ email, password }: UserProps) {
    const response = await api.post("/auth", { email, password });

    setUser(response.data.user);

    api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;

    localStorage.setItem(
      "@InventoryAuth:user",
      JSON.stringify(response.data.user)
    );
    localStorage.setItem(
      "@InventoryAuth:token",
      JSON.stringify(response.data.token)
    );

    history.push("/dashboard");
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
    history.push("/dashboard");
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, loading, user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
