import React, { Component } from 'react';

import { Platform, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default class SearchTab extends Component {
    static navigationOptions = {
        header: null,
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-search" size={25} style={{ color: tintColor }} />
        )
    };
    render() {
        return (
            <View><Text>SearchTab</Text></View>
        );
    }
}

