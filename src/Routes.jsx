import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import Books from './views/BookList';
import BookDetail from './views/BookDetail';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LogIn from './views/LogIn';
import Sign from './views/SignIn';
import User from './views/User';
import NotFound from './views/NotFound';
import AuthContextProvider from './contexts/AuthContext';

export default function Routes() {
  return (
    <Router>
      <AuthContextProvider>
        <NavBar />
        <Switch>
          <Route path="/users/:id" component={User} />
          <Route path="/login" component={LogIn} />
          <Route path="/signin" component={Sign} />
          <Route path="/books/:id" component={BookDetail} />
          <Route path="/books" component={Books} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </AuthContextProvider>
      <Footer />
    </Router>
  );
}
