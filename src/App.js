import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Loadable from 'react-loadable';

import { Footer } from './components/Footer';
import { Header } from './components/Header';

const Loading = () => {
  return <div>Loading...</div>;
};

const DynamicHome = Loadable({
  loader: () => import('./pages/Home'),
  loading: Loading
});

const DynamicAbout = Loadable({
  loader: () => import('./pages/About'),
  loading: Loading
});

const DynamicContact = Loadable({
  loader: () => import('./pages/Contact'),
  loading: Loading
});

export class App extends React.Component {
  render() {
    return (
      <div>
        <Footer />
        <Router>
          <div>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
            <hr />
            <Route exact path="/" component={DynamicHome} />
            <Route path="/about" component={DynamicAbout} />
            <Route path="/contact" component={DynamicContact} />
          </div>
        </Router>
        <button className="btn-large">Large</button>
        <button>Default</button>
        <button className="btn-small">Small</button>
        <a href="#" className="paper-btn">Link</a>
        <div className="row">
          <div className="col-6 col">
            <button className="btn-block">Block level</button>
          </div>
        </div>
        <button className="disabled">Disabled</button>
        <button disabled>Disabled</button>
        <Header />
      </div>
    );
  }
}
