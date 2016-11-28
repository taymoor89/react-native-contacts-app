import React, { Component } from 'react';
import {
    ListView,
    Text,
    TextInput,
    Button,
    View
} from 'react-native';

import Loader from './Loader';
import ListItem from './ListItem';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.baseUrl = 'https://contacts-rest.herokuapp.com';

        //Binding current context
        this.onAdd = this.onAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        //Setup datasource for list view
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        //Set initial state
        this.state = {
            dataSource: this.ds.cloneWithRows([]),
            data: [],
            name: '',
            show: true,
            text: 'Loading...'
        };

        this.loadData();
    }

    loadData(){
        fetch(this.baseUrl + '/v1/contacts')
            .then((response) => response.json())
            .then((contacts) => {
                this.setState({
                    data:contacts,
                    dataSource: this.ds.cloneWithRows(contacts),
                    show: false
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onAdd(){
        this.setState({ text: 'Saving...', show: true});
        const name = this.state.name;
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name})
        };

        fetch(this.baseUrl + '/v1/contacts', options)
            .then((response) => response.json())
            .then((contact) => {
                let data = this.state.data;
                data.push(contact);
                this.setState({
                    name: '',
                    data: data,
                    dataSource: this.ds.cloneWithRows(data),
                    show: false,
                    text: ''
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleDelete(contact){
        this.setState({ text: 'Deleting...', show: true});
        let url = this.baseUrl + `/v1/contacts/${contact.id}`;
        fetch(url, { method: 'DELETE' })
            .then(() => {
                const index = this.state.data.findIndex((element) => {
                    return element.id === contact.id;
                });
                this.state.data.splice(index, 1);
                this.setState({
                    name: '',
                    data: this.state.data,
                    dataSource: this.ds.cloneWithRows(this.state.data),
                    show: false,
                    text: ''
                });
            });
    }

    render() {
        return (
            <View style={{flex: 1, padding: 20}}>
                <View style={{height: 20, alignItems: 'center'}}>
                    <Loader
                        style={{flexDirection: 'center'}}
                        text={this.state.text}
                        show={this.state.show}
                    />
                </View>

                <View style={{flex: 5}}>
                    <Text style={{
                        fontWeight:'bold', fontSize:20,
                        marginTop:10, marginBottom:10
                    }}>
                        My Contacts
                    </Text>
                    <ListView
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => <ListItem onDelete={this.handleDelete} data={rowData}/>}
                    />
                </View>

                <View style={{flex: 1}}>
                    <TextInput
                        placeholder= "Enter Name"
                        value={this.state.name}
                        onChangeText={(name) => this.setState({name})}
                        onSubmitEditing={this.onAdd}
                    />
                </View>
            </View>
        );
    }
}