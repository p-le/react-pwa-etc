import React from 'react';
import ReactDOM from 'react-dom';

export class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.container = document.getElementById('footer');
  }
  render() {
    return ReactDOM.createPortal(
      <div>Footer</div>,
      this.container
    );
  }
}
