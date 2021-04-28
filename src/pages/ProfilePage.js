import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native';
import { View } from 'react-native';
import { Avatar, Divider, Icon, ListItem, Overlay, Text } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { keepLogin, logoutAction } from '../action';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker'

const ProfilePage = (props) => {
    const dispatch = useDispatch()
    // const navigation = useNavigation()
    const [gambar, setGambar] = useState('https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg')
    const [visible, setVisible] = useState(false)
    const [preview, setPreview] = useState(false)
    const { uname } = useSelector(({ UserReducer }) => {
        return {
            uname: UserReducer.username
        }
    })

    const onBtnLogout = () => {
        dispatch(logoutAction())
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
            })
        );
    }

    // const onBtnCam = () => {
    //     ImagePicker.openCamera({
    //         width: wp(40),
    //         height: wp(40),
    //         cropping: true,
    //         mediaType: 'photo'
    //     }).then(image => {
    //         console.log("image from cam", image)
    //         setGambar(image.path)
    //         setVisible(!visible)
    //     })
    //         .catch(err => {
    //             console.log("err img", err)
    //         })
    // }
    const onBtnGall = (type) => {
        ImagePicker[type]({
            width: wp(40),
            height: wp(40),
            cropping: true,
            mediaType: 'photo'
        }).then(image => {
            console.log("image from cam", image)
            setGambar(image.path)
            setVisible(!visible)
        })
            .catch(err => {
                console.log("err img", err)
            })
    }
    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                {/* MODAL CAM*/}
                <Overlay style={{ width: wp(80) }} isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
                    <ListItem bottomDivider containerStyle={{ width: wp(80) }} onPress={()=> onBtnGall("openPicker")}>
                        <Icon name="folder" type="feather" />
                        <ListItem.Content>
                            <ListItem.Title>Select from gallery</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                    <ListItem bottomDivider onPress={()=> onBtnGall("openCamera")}>
                        <Icon name="camera" type="feather" />
                        <ListItem.Content>
                            <ListItem.Title>Open Camera</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </Overlay>

                {/* PREVIEW */}
                <Overlay style={{ width: wp(80) }} isVisible={preview} onBackdropPress={() => setPreview(!preview)}>
                    <Image source={{uri: gambar}} style={{width: wp(90), height: hp(40)}}/>
                </Overlay>

                <View style={{ width: 'auto', height: 'auto', backgroundColor: '#0057a4' }}>
                    <View style={{ marginTop: hp(10), marginBottom: hp(5), display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Avatar
                                containerStyle={{ alignSelf: 'center' }}
                                size={120}
                                rounded
                                source={{
                                    uri: gambar
                                }}
                                title={uname.charAt(0)}
                                onPress={()=> setPreview(!preview)}
                            >
                                <Avatar.Accessory name="edit" type="feather" size={30}
                                    onPress={() => setVisible(!visible)} />
                            </Avatar>
                        </View>
                        <Text h4 style={{ margin: 10, color: 'white' }}>{uname}</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', width: wp(100), height: 'auto', borderTopRightRadius: 40, borderTopLeftRadius: 40 }}>
                        <Text h5 style={{ marginLeft: wp(14), marginVertical: hp(1), fontWeight: 'bold', fontSize: 18 }}>Account</Text>
                        {/* <Divider /> */}
                        <TouchableOpacity onPress={() => props.navigation.navigate("Transaction")}>
                            <View>
                                <ListItem bottomDivider>
                                    <Icon name="inbox" type="feather" size={23}
                                        iconStyle={{ color: 'black' }} />
                                    <ListItem.Content>
                                        <ListItem.Title>Transactions</ListItem.Title>
                                        <ListItem.Subtitle>See your transactions</ListItem.Subtitle>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                </ListItem>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <ListItem bottomDivider>
                                <Icon name="user" type="feather" size={23}
                                    iconStyle={{ color: 'black' }} />
                                <ListItem.Content>
                                    <ListItem.Title>Change Profile</ListItem.Title>
                                    <ListItem.Subtitle>Set your profile</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        </View>
                        <View>
                            <ListItem bottomDivider>
                                <Icon name="hash" type="feather" size={23}
                                    iconStyle={{ color: 'black' }} />
                                <ListItem.Content>
                                    <ListItem.Title>Promo</ListItem.Title>
                                    <ListItem.Subtitle>See available promos for you</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{ marginTop: 5, backgroundColor: 'white', width: wp(100), height: 'auto' }}>
                        <Text h5 style={{ marginLeft: wp(14), marginVertical: hp(1), fontWeight: 'bold', fontSize: 18 }}>About</Text>
                        <View>
                            <ListItem bottomDivider>
                                <Icon name="settings" type="feather" size={23}
                                    iconStyle={{ color: 'black' }} />
                                <ListItem.Content>
                                    <ListItem.Title>Settings</ListItem.Title>
                                    <ListItem.Subtitle>See available promos for you</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        </View>
                        <View>
                            <ListItem bottomDivider>
                                <Icon name="shield" type="feather" size={23}
                                    iconStyle={{ color: 'black' }} />
                                <ListItem.Content>
                                    <ListItem.Title>Privacy Policy</ListItem.Title>
                                    <ListItem.Subtitle>See our privacy policy</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        </View>
                    </View>
                    <View style={{ marginTop: 5, backgroundColor: 'white', width: wp(100), height: 'auto' }}>
                        <TouchableOpacity onPress={onBtnLogout}>
                            <ListItem bottomDivider>
                                <Icon name="log-out" type="feather" size={23}
                                    iconStyle={{ color: 'black' }} />
                                <ListItem.Content>
                                    <ListItem.Title>Logout</ListItem.Title>
                                    <ListItem.Subtitle>Logout from your account</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

export default ProfilePage