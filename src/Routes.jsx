import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import Books from './views/BookList';
import BookDetail from './views/BookDetail';
import BookNew from './views/BookNew';
import BookEdit from './views/BookEdit';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LogIn from './views/LogIn';
import SignUp from './views/SignUp';
import UserEdit from './views/UserEdit';
import User from './views/User';
import NotFound from './views/NotFound';
import AuthContextProvider from './contexts/AuthContext';
import AllUsers from './views/AllUsers';

export default function Routes() {
  return (
    <Router>
      <AuthContextProvider>
        <NavBar />
        <Switch>
          <Route path="/users/me/edit" component={UserEdit} />
          <Route path="/users/me" component={User} />
          <Route path="/users" component={AllUsers} />
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/books/new" component={BookNew} />
          <Route path="/books/:id/edit" component={BookEdit} />
          <Route path="/books/:id" component={BookDetail} />
          <Route path="/books" component={Books} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </AuthContextProvider>
    </Router>
  );
}
