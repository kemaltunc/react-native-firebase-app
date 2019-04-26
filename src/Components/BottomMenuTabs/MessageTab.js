import React, { Component } from 'react';

import { Platform, StyleSheet, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/dist/Ionicons';
export default class MessageTab extends Component {
    static navigationOptions = {
        header: null,
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-chatbubbles" size={25} style={{ color: tintColor }} />
        )
    };
    render() {
        return (
            <View><Text>SearchTab</Text></View>
        );
    }
}

