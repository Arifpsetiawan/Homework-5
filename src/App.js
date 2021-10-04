import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import "./App.css"
import { AuthorizedContextProvider } from "./AuthorizedContext"
import AuthorizedRoute from "./AuthorizedRoute"
import RestrictedWrapper from "./RestrictedWrapper"
import TransaksiPage from "./pages/Transaksi/TransaksiPage"
import Login from "./pages/login/Login"
import Home from "./pages/Home/Home"
import Logout from "./pages/Status/Logout"

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthorizedContextProvider>
        <Router>
          <Switch>
            <Route path="/" exact>
              <RestrictedWrapper>
                <Login />
              </RestrictedWrapper>
            </Route>
            <AuthorizedRoute
              path="/Transaksi"
              exact
              component={TransaksiPage}
            ></AuthorizedRoute>
            <Route path="/Signout" exact component={Logout} />
            <AuthorizedRoute path="/Home" exact component={Home}></AuthorizedRoute>
          </Switch>
        </Router>
      </AuthorizedContextProvider>
    </QueryClientProvider>
  )
}

export default App
