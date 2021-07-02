import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/Home';
// import AuthorList from './views/AuthorList';
// import AuthorDetail from './views/AuthorDetail';
import Books from './views/BookList';
import BookDetail from './views/BookDetail';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
// import SingleBook from './components/SingleBook';
import LogIn from './views/LogIn';
import Sign from './views/SignIn';
import User from './views/User';
import NotFound from './views/NotFound';

export default function Routes() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/users/:id" component={User} />
        <Route path="/login" component={LogIn} />
        <Route path="/signin" component={Sign} />
        <Route path="/books/:id" component={BookDetail} />
        <Route path="/books" component={Books} />
        {/* <Route path="/authors/:id" component={AuthorDetail} />
        <Route path="/authors" component={AuthorList} /> */}
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}
