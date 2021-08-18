import { useAuth } from "../../hooks/useAuth"


export function Dashboard() {
    const { signOut } = useAuth()

    return (
        <>
            <h1>DASHBOARD</h1>
            <button onClick={() => signOut()}>sair</button>
        </>
    )
}