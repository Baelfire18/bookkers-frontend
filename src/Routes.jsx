import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import AuthorList from './views/AuthorList';
import AuthorDetail from './views/AuthorDetail';
import Books from './views/BookList';
import BookDetail from './views/BookDetail';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
// import SingleBook from './components/SingleBook';
import Auth from './views/Auth';
import NotFound from './views/NotFound';

export default function Routes() {
  return (
    <Router>
      <div>
        <div id="wrapper">
          <NavBar />

          <body>
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="/books/:id" component={BookDetail} />
              <Route path="/books" component={Books} />
              <Route path="/authors/:id" component={AuthorDetail} />
              <Route path="/authors" component={AuthorList} />
              <Route exact path="/" component={Home} />
              <Route component={NotFound} />
            </Switch>
          </body>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
