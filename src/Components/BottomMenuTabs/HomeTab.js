import React, { Component } from 'react';

import { Platform, StyleSheet, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/dist/Ionicons';


export default class HomeTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-home" size={25} style={{ color: tintColor }} />
        )
    };
    componentDidMount() {


    }
    render() {
        return (
            <View><Text>Home</Text></View>
        );
    }
}

