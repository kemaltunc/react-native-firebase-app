import React, { Component } from 'react';

import { Platform, StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView, ImageBackground, ListView, TextInput } from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';


import CardView from 'react-native-cardview'
import { green, grey } from 'ansi-colors';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import HomeTab from '../ProfileMenuTabs/HomeTab'

import ActionButton from 'react-native-action-button';

import firebase from '../firebase'

import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob'

import { BottomSheet } from 'react-native-btr';

import DialogInput from 'react-native-dialog-input';

type Props = {};
export default class AccountTab extends Component<Props>  {

    static navigationOptions = {
        header: null,
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-person" size={25} style={{ color: tintColor }} />
        )
    };

    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0,
            dialogVisible: false,

            id: firebase.auth().currentUser.uid,
            ref: firebase.database().ref(),

            name: '',
            surname: '',
            about: '',
            profile_image: '',
            profile_url: '',
            cover_image: '',
            cover_url: '',

            visible: false,
        }

    };

    componentDidMount() {
        ref = this.state.ref.child('Users').child(this.state.id)

        ref.once('value', (snapshot) => {

            if (snapshot.val().image) {

                this.setState({
                    profile_url: snapshot.val().imageUrl,
                    profile_image: snapshot.val().image,
                })

            }
            if (snapshot.val().cover) {
                this.setState({
                    cover_url: snapshot.val().coverUrl,
                    cover_image: snapshot.val().cover,
                })
            }


            this.setState({
                name: snapshot.val().name,
                surname: snapshot.val().surname,
                about: snapshot.val().about
            })



        })



    }

    openSettings = () => {
        this.setState({ visible: !this.state.visible });
    }
    changePhoto = (type) => {
        var uuid = require('react-native-uuid');

        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob

        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            mediaType: 'photo'
        }).then(image => {

            const imagePath = image.path

            let uploadBlob = null

            var imageRef;

            if (type == "profile") {
                if (this.state.profile_image == '')
                    randomId = uuid.v4();
                else
                    randomId = this.state.profile_image
                imageRef = firebase.storage().ref("images/profile_images").child(`${randomId}`)
            } else {
                if (this.state.cover_image == '')
                    randomId = uuid.v4();
                else
                    randomId = this.state.profile_image
                imageRef = firebase.storage().ref("images/cover_images").child(`${randomId}`)
            }

            let mime = 'image/jpg'
            fs.readFile(imagePath, 'base64')
                .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(blob, { contentType: mime })
                })
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    userRef = firebase.database().ref('Users').child(this.state.id);
                    if (type == "profile") {
                        userRef.update({
                            image: randomId,
                            imageUrl: url
                        })
                    }
                    else {
                        userRef.update({
                            cover: randomId,
                            coverUrl: url
                        })
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        })
            .catch((error) => {
                console.log(error)
            })


    }

    segmentClicked = (index) => {

        this.setState({
            activeIndex: index
        })


    }

    changeStatus = () => {
        this.setState({ dialogVisible: true })
    }
    handleOk = (value) => {
        this.state.ref.child('Users').child(this.state.id).update({
            about: value
        }).then(() => {
            this.setState({ dialogVisible: false, about: value })

        })

    }
    handleCancel = () => {
        this.setState({ dialogVisible: false })
    }


    render() {
        const { navigate } = this.props.navigation

        return (
            <View style={styles.container} >
                <ScrollView  >

                    {this.state.cover_url == '' ?
                        <ImageBackground
                            style={{ width: null, height: 250, resizeMode: 'cover', backgroundColor: '#2980b9' }}
                        >
                            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                                {this.state.profile_url == '' ?
                                    <Image
                                        style={{ width: 120, height: 120, resizeMode: 'cover', borderRadius: 100, backgroundColor: '#3498db', opacity: 0.5 }}
                                    />
                                    : <Image source={{ uri: `${this.state.profile_url}` }}
                                        style={{ width: 120, height: 120, resizeMode: 'cover', borderRadius: 100 }}
                                    />}
                            </View>
                            <View style={{ position: 'absolute', top: 200, left: 13, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: 25 }}>{this.state.name} {this.state.surname}</Text>
                            </View>

                        </ImageBackground>
                        : <ImageBackground source={{ uri: `${this.state.cover_url}` }}
                            style={{ width: null, height: 250, resizeMode: 'cover' }}
                        >
                            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                                {this.state.profile_url == '' ?
                                    <Image
                                        style={{ width: 120, height: 120, resizeMode: 'cover', borderRadius: 100, backgroundColor: '#3498db', opacity: 0.5 }}
                                    />
                                    : <Image source={{ uri: `${this.state.profile_url}` }}
                                        style={{ width: 120, height: 120, resizeMode: 'cover', borderRadius: 100 }}
                                    />}
                            </View>
                            <View style={{ position: 'absolute', top: 200, left: 13, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#fff', fontSize: 25 }}>{this.state.name} {this.state.surname}</Text>
                            </View>
                        </ImageBackground>}

                    <CardView style={{ marginTop: 5 }}
                        cardElevation={0}
                        cardMaxElevation={0}
                        cornerRadius={0}>
                        <View style={{ flexDirection: 'row', paddingTop: 8, position: 'relative' }}>

                            <View style={{ alignItems: 'center', position: 'absolute', top: 5, left: 13 }}>
                                <Text style={{ color: 'grey' }}>300</Text>
                                <Text style={{ fontSize: 13, color: 'grey', fontWeight: 'bold' }}>Takip</Text>
                            </View>
                            <View style={{ alignItems: 'center', position: 'absolute', top: 5, left: 70 }}>
                                <Text style={{ color: 'grey' }}>150</Text>
                                <Text style={{ fontSize: 13, color: 'grey', fontWeight: 'bold' }}>Takipçi</Text>
                            </View>
                            <View style={{ alignItems: 'center', flex: 1, position: 'absolute', top: 5, left: 135 }}>
                                <Text style={{ color: 'grey' }}>70</Text>
                                <Text style={{ fontSize: 13, color: 'grey', fontWeight: 'bold' }}>Gönderi</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 20 }}>
                                <TouchableOpacity onPress={this.openSettings} style={{ width: 10 }}>
                                    <View>
                                        <Icon size={25} color="grey" name="md-more" />
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <DialogInput isDialogVisible={this.state.dialogVisible}
                            submitInput={(about) => { this.handleOk(about) }}
                            closeDialog={() => { this.handleCancel() }}
                            submitText="TAMAM"
                            cancelText="İPTAL"
                            initValueTextInput={this.state.about}>
                        </DialogInput>

                        <View style={{ marginTop: 30, paddingLeft: 13, marginBottom: 10 }}><Text>{this.state.about}</Text></View>

                        <View style={{ height: 1, backgroundColor: '#f5f5f5', marginTop: 8 }}></View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 5, paddingBottom: 5 }}>
                            <TouchableOpacity onPress={() => { this.segmentClicked(0) }}>

                                <Icon name="md-reorder" color="#2980b9" size={28} style={[this.state.activeIndex == 0 ? {} : {
                                    color: '#dedede'
                                }]} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { this.segmentClicked(1) }}>

                                <Icon name="md-search" color="#2980b9" size={26} style={[this.state.activeIndex == 1 ? {} : {
                                    color: '#dedede'
                                }]} />
                            </TouchableOpacity>
                        </View>
                    </CardView>
                    <HomeTab />

                </ScrollView >


                {
                    this.state.activeIndex == 0 ? <ActionButton buttonColor="#2980b9" onPress={() => navigate('createPostScreen')}>
                    </ActionButton> : null
                }
                <BottomSheet
                    visible={this.state.visible}
                    //setting the visibility state of the bottom shee
                    onBackButtonPress={this.openSettings}
                    //Toggling the visibility state on the click of the back botton
                    onBackdropPress={this.openSettings}
                >
                    <View style={styles.bottomNavigationView}>
                        <TouchableOpacity style={styles.settingButton}
                            onPress={() => {
                                this.openSettings();
                                this.changePhoto("cover");
                            }}>
                            <Text style={styles.settingText}>Kapak fotoğrafı değiştir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settingButton}
                            onPress={() => {
                                this.openSettings();
                                this.changePhoto("profile");
                            }}
                        >
                            <Text style={styles.settingText}>Profil fotoğrafı değiştir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settingButton}
                            onPress={() => {
                                this.openSettings();
                                this.changeStatus();
                            }}
                        >
                            <Text style={styles.settingText}>Durum yazısını değiştir</Text>
                        </TouchableOpacity>

                        <View style={{ height: 1, width: '100%', backgroundColor: '#dedede' }}></View>

                        <TouchableOpacity style={{ marginTop: 10 }}>
                            <Text style={styles.settingText}>Çıkış yap</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheet>


            </View >
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 25

    },
    settingButton: {
        width: '100%',
        height: 40,

    },
    settingText: {
        fontSize: 15,
        fontWeight: '300'
    }

});


