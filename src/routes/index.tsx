import { Redirect, Route, RouteProps, Switch } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { useAuth } from "../hooks/useAuth";
import { Dashboard } from "../pages/Dashboard";
import { Inventory } from "../pages/Inventory";
import { Products } from "../pages/Products";
import { SignIn } from "../pages/SignIn";
import { useLoading, Audio } from "@agney/react-loading";

interface CustomRouteProps extends RouteProps {
  isPrivate: boolean;
}

export function Routes() {
  const { signed, loading } = useAuth();
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    loaderProps: {
      valueText: 'color: blue'
    },
    // @ts-expect-error
    indicator: <Audio width='50' />,
  });

  function CustomRoute({ isPrivate, ...rest }: CustomRouteProps) {
    if (loading) {
      return (
        <section {...containerProps}>
          {indicatorEl}
        </section>
      );
    }

    if (isPrivate && !signed) {
      return <Redirect to="/" exact />;
    }

    if (signed && window.location.pathname === "/") {
      return <Redirect to="/dashboard" exact />;
    }

    return <Route {...rest} />;
  }

  return (
    <>
      {signed ? <NavBar /> : true}
      <Switch>
        <CustomRoute isPrivate={false} path="/" component={SignIn} exact />
        <CustomRoute isPrivate exact path="/dashboard" component={Dashboard} />
        <CustomRoute isPrivate exact path="/products" component={Products} />
        <CustomRoute isPrivate exact path="/inventory" component={Inventory} />
      </Switch>
    </>
  );
}
