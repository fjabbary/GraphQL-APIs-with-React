import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://graphqlzero.almansi.me/api",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </div>
);
