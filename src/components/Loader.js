import React, { Component } from 'react';
import { Text } from 'react-native';

export default class Loader extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let display = this.props.show? this.props.text.toUpperCase(): '';
		return (
			<Text style={{ color: 'green' }}>
				{display}
			</Text>
		);
	}
}