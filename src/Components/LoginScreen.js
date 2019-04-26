
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
    Alert
} from 'react-native';


import { ProgressDialog } from 'react-native-simple-dialogs';

import firebase from './firebase'

type Props = {};
export default class LoginScreen extends Component<Props> {

    
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);

        this.state = {

            email:'',
            password:'',

            progressVisible: false,
            progresTitle: '',
            progresMessage: ''

        };

    }


    handleLogin = async () => {
        const { email, password } = this.state

        this.setState({
            progressVisible: true,
            progresMessage: 'Giriş yapılıyor, lütfen bekleyin...'

        })

        try{
            firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate('mainScreen')
            })
            .catch(error => {
                Alert.alert("Hata","Kullanıcı adı veya şifre hatalı")
            })
            .then(() => {
                this.setState({ progressVisible: false })
            })
        }catch(error){

        }

    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <View style={styles.logoContainer} >
                        <Image
                            source={require('../assets/images/logo.png')}
                            style={styles.logo}
                        />

                        <Text style={styles.title}>Burada şiirlerini özgürce paylaşabilirsin</Text>

                    </View>
                    <ProgressDialog
                        visible={this.state.progressVisible}
                        title={this.state.progresTitle}
                        message={this.state.progresMessage}
                    />

                    <View style={styles.formContainer}>
                     
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
                            returnKeyType="go"
                            style={styles.input}
                            ref={(input) => this.passwordInput = input}
                            onChangeText={(password) => this.setState({ password })}

                        />
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={this.handleLogin} >
                            <Text style={styles.buttonText}>GİRİŞ YAP</Text>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', marginTop: 12 }}>
                            <Text style={{ color: '#fff', opacity: 0.7, fontSize: 13 }}>Hala bir hesabın yok mu?</Text>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('signupScreen') }}><Text style={{ color: '#fff', fontWeight: 'bold', opacity: 0.8, fontSize: 13 }}> Hesap oluştur</Text></TouchableOpacity>
                        </View>
                    </View>

                </KeyboardAvoidingView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 0.75,
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
