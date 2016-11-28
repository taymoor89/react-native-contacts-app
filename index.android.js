import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import App from './src/components/App';

export default class MyContacts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <App />
    );
  }
}

AppRegistry.registerComponent('MyContacts', () => MyContacts);