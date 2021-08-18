import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { Dashboard } from "../pages/Dashboard";

export function AppRoutes() {
    const { signed } = useAuth()

    console.log('app routes 1')


    if(signed) {
        return <Redirect from='/' to='/dashboard'/>
    }

    console.log('app routes')

    return (
        <Route path='/dashboard' component={Dashboard}/>
    )
}