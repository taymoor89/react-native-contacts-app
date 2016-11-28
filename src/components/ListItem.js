import React, {Component} from 'react';
import { View, Text, Alert } from 'react-native';

export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.showAlert = this.showAlert.bind(this);
    }

    showAlert(){
        Alert.alert(
            this.props.data.name,
            'Are you sure you want to delete?',
            [
                {text: 'YES', onPress: () => this.props.onDelete(this.props.data)},
                {text: 'No'}
            ]
        )
    }

    render() {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{width: 100, height: 30}}>{this.props.data.name}</Text>
                <Text
                    style={{width: 50, height: 30, color: '#ed5e68'}}
                    onPress={this.showAlert}
                >
                    Delete
                </Text>
            </View>
        );
    }
}