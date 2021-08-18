import { Route } from "react-router-dom";

import { SignIn } from "../pages/SignIn";

export function AuthRoutes() {
    return (
        <Route path='/' exact component={SignIn}/>
    )
}