import { Redirect, Route, RouteProps, Switch } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Dashboard } from "../pages/Dashboard";
import { SignIn } from "../pages/SignIn";

interface CustomRouteProps extends RouteProps {
    isPrivate: boolean;
}

export function Routes() {
    const { signed, loading } = useAuth()

    console.log(loading)

    function CustomRoute({isPrivate, ...rest}: CustomRouteProps) {      
        if (loading) {
          return <h1>Loading...</h1>;
        }
      
        if (isPrivate && !signed) {
          return <Redirect to="/" exact />
        }

        if(signed && window.location.pathname === '/') {
          return <Redirect to="/dashboard" exact />
        }

        console.log(window.location.pathname)
      
        return <Route {...rest} />;
      }

    return (
        <Switch>
            <CustomRoute isPrivate={false}  path="/" component={SignIn} exact />
            <CustomRoute isPrivate exact path="/dashboard" component={Dashboard} />
        </Switch>
    )
}