import React, { Component } from 'react';

import { Platform, StyleSheet, Text, View, Image } from 'react-native';

import firebase from './firebase'

export default class StartScreen extends Component {
    static navigationOptions = {
        header: null,

    };
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'main' : 'loginScreen')
        })
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#3498db' }}>
                <Image style={{
                    width: 100,
                    height: 100,
                }}
                    source={require('../assets/images/logo.png')}

                />
            </View>
        );
    }
}

