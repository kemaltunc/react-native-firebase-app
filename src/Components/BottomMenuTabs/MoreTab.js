import React, { Component } from 'react';

import { Platform, StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import firebase from '../firebase'

export default class MoreTab extends Component {
    static navigationOptions = {
        header: null,
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-list" size={25} style={{ color: tintColor }} />
        )
    };
    logout = async () => {
     
        try {
            await firebase.auth().signOut();


        } catch (Error) {

        }
    }
    render() {
        return (
           
                <TouchableOpacity
                    onPress={this.logout} >
                      <Text >Çıkış yap</Text>
                </TouchableOpacity>
             
        );
    }
}

