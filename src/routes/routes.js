import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import LivrosIndex from "../pages/LivrosIndex";
import LivrosCreate from "../pages/LivrosCreate";

export default function Routes() {
  //   const PrivateRoute = ({ component: Component, ...rest }) => (
  //     <Route
  //       {...rest}
  //       render={(props) =>
  //         isAuthenticated() ? (
  //           <Component {...props} />
  //         ) : (
  //           <Redirect
  //             to={{ pathname: "/login", state: { from: props.location } }}
  //           />
  //         )
  //       }
  //     />
  //   );

  return (
    <BrowserRouter>
      <div>
        <Route exact path="/livros" component={LivrosIndex} />
        <Route path="/livros/inserir" component={LivrosCreate} />
      </div>
    </BrowserRouter>
  );
}
