import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const TOKEN = "TOKEN";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const loginUser = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logoutUser = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  window.location.reload();
};

//5 링크에 토큰값까지 붙여서 호출할것
const httpLink = createHttpLink({
  uri: "http://192.168.0.10:4001/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN) ? localStorage.getItem(TOKEN) : "",
    },
  };
});

export const client = new ApolloClient({
  // uri: "http://192.168.0.10:4001/graphql",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
