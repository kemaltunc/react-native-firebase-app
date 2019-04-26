import React, { Component } from 'react';

import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

import firebase from './firebase'

import { ProgressDialog } from 'react-native-simple-dialogs';

import firebaseTime from 'firebase'

export default class CreatePostScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',

            progressVisible: false,
            progresTitle: '',
            progresMessage: ''
        }

    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'Şiir oluştur',
            headerRight: (
                <TouchableOpacity style={{ paddingRight: 20 }}
                    onPress={navigation.getParam('save')}>
                    <Text style={{ color: '#f5f5f5', fontWeight: 'bold' }}>Paylaş</Text>
                </TouchableOpacity>
            ),
            headerTintColor: '#f5f5f5',
            headerStyle: {
                backgroundColor: '#2980b9',
            },

        };
    };
    insertData = () => {


        const { title, content } = this.state

        this.setState({
            progressVisible: true,
            progresMessage: 'Şiir paylaşılıyor, lütfen bekleyin...'
        })

        id = firebase.auth().currentUser.uid
        firebase.database().ref().child('Poetry').child(id).push({
            title: title,
            content: content,
            createdAt: firebaseTime.database.ServerValue.TIMESTAMP,

        }).then(() => {
            Alert.alert("Başarılı", "Şiir başarı ile paylaşıldı")
        }).catch((error) => {
            Alert.alert("Hata", "Şiir paylaşılırken bir hata meydana geldi")
        }).then(() => {
            this.setState({ progressVisible: false })
        })




    }
    componentDidMount() {
        this.props.navigation.setParams({ save: this.insertData });
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <TextInput style={styles.title}
                        placeholder="Şiir için başlık girin"
                        returnKeyType="next"
                        onChangeText={(title) => this.setState({ title })}
                    />

                    <TextInput style={styles.content}
                        placeholder="Şiir içeriğini girin"
                        multiline={true}
                        onChangeText={(content) => this.setState({ content })}
                    />
                    <ProgressDialog
                        visible={this.state.progressVisible}
                        title={this.state.progresTitle}
                        message={this.state.progresMessage}
                    />

                </ScrollView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,

    },
    title: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#dedede'
    },
    content: {
        marginTop: 10,
        minHeight: 200,
        borderWidth: 1,
        borderColor: '#dedede',
        marginBottom: 20,
        borderRadius: 3,
        textAlignVertical: 'top',
        padding: 10,
    }, buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '700'
    }

});