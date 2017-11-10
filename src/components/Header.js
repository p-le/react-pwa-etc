import React from 'react';
import ReactDOM from 'react-dom';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.container = document.getElementById('header');
  }
  render() {
    return ReactDOM.createPortal(
      <div>Header</div>,
      this.container
    );
  }
}
