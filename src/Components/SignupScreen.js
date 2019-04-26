
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    StatusBar,
    Alert,
    ScrollView
} from 'react-native';


import { ProgressDialog } from 'react-native-simple-dialogs';

import firebase from './firebase'

type Props = {};
export default class SignupScreen extends Component<Props> {

    static navigationOptions = {
        title: 'Hesap oluştur',
        headerTintColor: '#f5f5f5',
        headerStyle: {
            backgroundColor: '#2980b9',
        },


    };
    constructor(props) {
        super(props);

        this.state = {

            email:'',
            password:'',
            cpassword:'',
            name:'',
            surname:'',

            progressVisible: false,
            progresTitle: '',
            progresMessage: ''

        };

    }


    handleSingup = async () => {

        const { email, password,cpassword,name,surname } = this.state

        this.setState({
            progressVisible: true,
            progresMessage: 'Hesap oluşturuluyor, lütfen bekleyin...'
        })

        try {
            await firebase.auth()
                .createUserWithEmailAndPassword(email,password)
                .then(() => {
                    id = firebase.auth().currentUser.uid
                       firebase.database().ref().child('Users').child(id).set({
                       name:name,
                       surname:surname,
                    })

                    this.props.navigation.navigate('mainScreen')
                })
                .catch(error=>{
                    Alert.alert("Hata","Hesap oluşturulurken bir hata meydana geldi")
                })
                .then(() => {
                    this.setState({ progressVisible: false })
                })
        } catch (error) {

        }

    }

    render() {
        return (
            <View style={styles.container}>

                <ScrollView style={styles.container}>
                    <View style={styles.topContainer} >
                        <Image
                            source={require('../assets/images/logo.png')}
                            style={styles.logo}
                        />
                        <Text style={styles.title}>Buradan yeni bir hesap oluşturabilirsiniz</Text>
                    </View>
                    <ProgressDialog
                        visible={this.state.progressVisible}
                        title={this.state.progresTitle}
                        message={this.state.progresMessage}
                    />

                    <View style={styles.formContainer}>
                        <StatusBar
                            barStyle="light-content"
                            backgroundColor="#2980b9"

                        />
                        <TextInput
                            placeholder="İsim"
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            style={styles.input}
                            onChangeText={(name) => this.setState({ name })}

                        />
                        <TextInput
                            placeholder="Soyisim"
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            returnKeyType="next"
                            autoCapitalize="none"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            style={styles.input}
                            onChangeText={(surname) => this.setState({ surname })}

                        />
                        <TextInput
                            placeholder="Email adresi"
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            returnKeyType="next"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            style={styles.input}
                            onChangeText={(email) => this.setState({ email })}

                        />
                        <TextInput
                            placeholder="Şifre"
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            secureTextEntry
                            returnKeyType="next"
                            style={styles.input}
                            ref={(input) => this.passwordInput = input}
                            onChangeText={(password) => this.setState({ password })}

                        />
                        <TextInput
                            placeholder="Şifre tekrar"
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            secureTextEntry
                            returnKeyType="go"
                            style={styles.input}
                            ref={(input) => this.passwordInput = input}
                            onChangeText={(cpassword) => this.setState({ cpassword })}

                        />
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={this.handleSingup} >
                            <Text style={styles.buttonText}>KAYIT OL</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
        paddingTop: 25
    },
    topContainer: {
        alignItems: 'center',
        flexGrow: 0.5,
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 100,
    },
    title: {
        color: '#fff',
        marginTop: 10,
        textAlign: 'center',
        opacity: 0.7,

    },
    formContainer: {
        padding: 20,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: '#fff',
        paddingHorizontal: 10,
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: '700'
    }


});
