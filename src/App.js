import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { isLoggedInVar } from "./apollo";
import { PageNotFound } from "./components/PageNotFound";
import { routes } from "./routes";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";
import { SignUp } from "./screens/SignUp";
import { client } from "./apollo";
import { HelmetProvider } from "react-helmet-async";
import { GlobalStyled } from "./styles";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <GlobalStyled />
        <Router>
          <Routes>
            <Route
              path={routes.home}
              element={isLoggedIn ? <Home /> : <Login />}
            />
            <Route
              path={routes.signup}
              element={isLoggedIn ? <Home /> : <SignUp />}
            />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
