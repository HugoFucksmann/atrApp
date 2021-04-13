import React, { } from 'react'
import AtrProvider from './context/atrContext';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'fontsource-roboto';
import NavBar from './components/navBar';
import Login from './components/login';
import ProtectedRoute from './helpers/protectedRoute'
import Dashboard from './pages/dashboard';
import Error404 from './pages/404';
import { Container } from '@material-ui/core';

function App() {
  return (
    <AtrProvider>
    <NavBar />
    <Container maxWidth="sm">
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <ProtectedRoute path="/usuario/:id" component={Dashboard} />
        <Route path="*" component={Error404} />
      </Switch>
    </Router>
      </Container>
  </AtrProvider>
  );
}

export default App;
