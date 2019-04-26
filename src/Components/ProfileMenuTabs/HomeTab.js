import React, { Component } from 'react';

import { Platform, StyleSheet, Text, View, Alert, FlatList, TouchableOpacity, ListView } from 'react-native';


import Icon from 'react-native-vector-icons/dist/Ionicons';

import CardView from 'react-native-cardview'

import firebase from '../firebase'

import { Container, Content, Card, CardItem, Thumbnail, Body, Left, Right, Button } from 'native-base'

import moment from 'moment';

export default class HomeTab extends Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="md-home" size={25} style={{ color: tintColor }} />
        )
    };
    constructor(props) {
        super(props);
        this.state = {
            itemList: [],
            id: firebase.auth().currentUser.uid,
            ref: firebase.database().ref(),

            name: '',
            surname: '',
            image: '',

        }
        this.renderItem = this.renderItem.bind(this);
        this.pressLike = this.pressLike.bind(this);

    };

    componentDidMount = () => {
        this.loadData()
    }

    timeFormat = (date) => {

        var newDate = moment(date).format("DD/MM")
        return newDate;
    }
    loadData = async () => {

        ref = this.state.ref.child('Poetry').child(this.state.id)
        let items = [];

        ref.on('value', (snapshot) => {
            snapshot.forEach((child) => {
                this.state.ref.child('Users').child(snapshot.key)
                    .once('value', (user) => {
                        items.push({
                            senderId: snapshot.key,//Post paylasanın id'si
                            key: child.key,//postun id'si
                            title: child.val().title,
                            content: child.val().content,
                            createdAt: this.timeFormat(child.val().createdAt),


                            name: user.val().name,
                            surname: user.val().surname,
                            image: user.val().imageUrl,
                        });

                    }).then(() => {
                        itemsSort = items.sort(function (a, b) {
                            return b.createdAt - a.createdAt
                        })
                        this.setState({
                            itemList: itemsSort
                        });
                    })
            });

        })
    }

    pressLike(postId) {

        this.state.ref.child("Like").child(postId).child(this.state.id).set({
            type: "true"
        })

    }


    renderItem({ item }) {
        return (

            <Card style={{ borderTopColor: '#f5f5f5', elevation: 0, marginBottom: -6 }}>
                <CardItem>
                    <Left>

                        <Thumbnail source={{ uri: `${item.image}` }}></Thumbnail>
                        <Body>
                            <Text style={{ fontWeight: 'bold', color: 'black' }}>{item.name} {item.surname}</Text>
                            <Text note>{item.createdAt}</Text>
                        </Body>
                    </Left>
                    <Right style={{ marginTop: -20 }}>
                        <TouchableOpacity style={{ height: 25, width: 23 }}>
                            <Icon name="ios-bookmark" size={23} />
                        </TouchableOpacity>
                    </Right>
                </CardItem>
                <CardItem >
                    <Body>
                        <Text style={{ fontWeight: '900', fontSize: 18, color: 'black' }}>{item.title}</Text>
                        <Text style={{ marginTop: 8 }}>{item.content} ...</Text>
                    </Body>
                </CardItem>
                <CardItem style={{ width: '100%', height: 45 }}>
                    <Left>
                        <TouchableOpacity style={styles.postButtons} onPress={() => {
                            this.pressLike(item.key);
                        }}>
                            <Icon name="ios-thumbs-up" size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.postButtons} >
                            <Icon name="ios-chatbubbles" size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.postButtons}>
                            <Icon name="ios-share-alt" size={20} />
                        </TouchableOpacity>
                    </Left>
                    <Right>
                        <TouchableOpacity style={{ height: 25, width: 15 }} transparent>
                            <Icon name="md-more" size={20} />
                        </TouchableOpacity>
                    </Right>
                </CardItem>
                <CardItem style={{ height: 10 }}>
                    <Text style={{ fontSize: 12 }}>101 beğeni</Text>
                </CardItem>
                <CardItem style={{ marginTop: -4 }}>
                    <Body>
                        <Text>
                            <Text style={{ fontWeight: '900', color: 'black' }}>Kemal TUNÇ</Text> Seladskdsfmsdogm
                        </Text>
                    </Body>
                </CardItem>

            </Card >

        );
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.itemList}
                    renderItem={this.renderItem}
                />
            </View>


        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    postButtons: {
        marginRight: 20,
    }
});

