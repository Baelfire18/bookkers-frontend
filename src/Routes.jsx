import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './views/Home';
import AuthorList from './views/AuthorList';
import AuthorDetail from './views/AuthorDetail';
import Books from './components/Books';
// import SingleBook from './components/SingleBook';
import NotFound from './views/NotFound';

export default function Routes() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/authors/1">MyProfile</Link>
            </li>
            <li>
              <Link to="/books">Books</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          {/* <Route path="/books/:id" component={SingleBook} /> */}
          <Route path="/books" component={Books} />
          <Route path="/authors/:id" component={AuthorDetail} />
          <Route path="/authors" component={AuthorList} />        
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}