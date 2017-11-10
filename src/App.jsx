import React from 'react';
import ReactModal from 'react-modal';

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
  constructor() {
    super();
    this.state = {
      showModal :false,
    };
  }

  handleOpenModal = () => {
    this.setState({
      showModal: true
    });
  }
  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
  }

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
        <button onClick={this.handleOpenModal}>Login</button>
        <ReactModal
           isOpen={this.state.showModal}
           contentLabel="Login"
        >
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>
        <Header />
      </div>
    );
  }
}
