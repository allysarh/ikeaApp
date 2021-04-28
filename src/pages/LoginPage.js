import { Image, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Icon, Input, ThemeProvider } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
// menggunakan react hooks untuk menggunakan action(menggnatikan connect)
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getDataLogin, onLogin, keepLogin } from '../action'
import axios from 'axios';
import { URL_API } from '../helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigator } from "react-navigation";
import { StackActions } from '@react-navigation/native';
import { UserReducer } from '../reducer/UserReducer';



const LoginPage = (props) => {
    const [username, setUsername] = useState('')
    // console.log("username", username)
    const [password, setPassword] = useState('')
    // console.log("password", password)
    const [dataLogin, setDataLogin] = useState([])
    // splash screen
    const [loginForm, setLoginForm] = useState(false)
    const [PassShow, setPassShow] = useState(true)
    // untuk menjalankan fungsi dari action
    const dispatch = useDispatch()

    // component didmount di func
    // useEffect(async () => {
    //     // menjalankan fungsi action
    //     // dispatch(getUsers())
    //     // setTimeout(() => setLoginForm(true), 2000)
    //     // loginAllTime()
    // }, [])

    const { idUser } = useSelector(({ UserReducer }) => {
        return {
            idUser: UserReducer.id
        }
    })

    //component did update
    useEffect(() => {
        console.log("id data dari reducer:", idUser)
        setTimeout(() => setLoginForm(true), 2000)
        // apabila sudah login, langsung beralih ke home dan tidak bisa kembali lagi
        if (idUser) {
            props.navigation.dispatch(StackActions.replace("TabNav"))
        }
    })

    // mengecek data dari database tanpa redux thunk
    // const getLogin = async () => {
    //     try {
    //         let verif = await axios.get(URL_API + `/users/?username=${username}&password=${password}`)
    //         // console.log("get data login", verif.data)
    //         // console.log("get data login length", verif.data.length)
    //         dispatch(getDataLogin(verif.data))
    //         // await setDataLogin(verif.data)
    //         if (verif.data.length) {
    //             AsyncStorage.setItem('id', verif.data[0].id.toString(), async (err) => {
    //                 if (err) {
    //                     console.log("error async storage", err)
    //                 }
    //             })
    //             console.log("berhasil")
    //             alert("Logging in!")
    //             props.navigation.navigate('Home')
    //         } else {
    //             console.log("not found")
    //         }

    //     } catch (error) {
    //         console.log("login err", error)
    //     }
    // }

    const onBtnLogin = () => {
        // tanpa redux thunk
        // getLogin()

        //coba kondisi:
        // console.log("data login", dataLogin)
        // console.log("data login length", dataLogin.length)

        // if (dataLogin.length) {
        //     console.log("berhasil!!")
        //     // AsyncStorage.setItem('dataLogin', dataLogin, async (err) => {
        //     //     if (err) {
        //     //         console.log("error async storage", err)
        //     //     }
        //     // })
        // } else {
        //     console.log("user not found!")
        // }

        if (username === "" || password === "") {
            alert("Fill up the form!")
        } else {
            dispatch(onLogin(username, password))
        }
    }


    // keep login
    //pindahin ke stack navigation
    // const loginAllTime = async () => {
    //     // return async: biar bisa menunggu
    //     try {
    //         let id = await AsyncStorage.getItem('id')
    //         let loginData = await axios.get(URL_API + `/users?id=${id}`)
    //         console.log("data keep login", loginData.data[0])
    //         dispatch(keepLogin(loginData.data[0]))
    //     } catch (error) {
    //         console.log("error", error)
    //     }
    // }
    const passShowFunc = () =>{
        setPassShow(!PassShow)
        alert("test!")
    }
    
    if (loginForm) {
        return (
            <>
                <View style={{ flex: 1, backgroundColor: '#0057a4', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: wp(80), height: hp(20) }}>
                        <Image
                            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUUr-6KsgpTOBqasj_EQab6jPZ4-G9PKxFtM7teXJ-ZciX7Zkv44Lnm90IDbcvW1st8w&usqp=CAU' }}
                            style={{ flex: 1 }} />
                    </View>
                    <Text style={{ color: 'white' }}>Hej! Sign In with your Account</Text>
                    <View style={{ width: wp(75), alignItems: 'center', margin: hp(5) }}>
                        <Input placeholder='Username'
                            leftIcon={
                                <Icon name="user" type="feather" size={22} color="white" />
                            }
                            onChangeText={e => setUsername(e)}
                            placeholderTextColor="white"
                            style={{ color: 'white' }} />
                        <Input placeholder='Password' secureTextEntry={PassShow}
                            leftIcon={
                                <Icon name="lock" type="feather" size={22} color="white"/>
                            }
                            rightIcon={
                                <Icon name={PassShow? "eye-off" : "eye"} type="feather" size={22} color="white" onPress={()=>setPassShow(!PassShow)}/>
                            }
                            onChangeText={e => setPassword(e)}
                            placeholderTextColor="white"
                            style={{ color: 'white' }} />
                        <Button title="Sign In" onPress={onBtnLogin}
                            containerStyle={{ width: wp(50) }}
                            titleStyle={{color: '#0057a4', fontWeight: 'bold'}}
                            buttonStyle={{ backgroundColor: '#f7c600' }} />
                    </View>
                </View>
                <View style={{ backgroundColor: '#0057a4', alignItems: 'center', padding: '5%' }}>
                    <Text style={{ color: 'white' }}>Have no acocunt?</Text>
                    <Text title="Sign Up" onPress={() => props.navigation.navigate('Register')}
                        containerStyle={{ width: wp(50), margin: 10 }}
                        style={{ color: 'yellow', fontWeight: 'bold' }}>Sign up here!</Text>
                </View>
            </>
        )
    } else {
        return (
            <View style={{ flex: 1, backgroundColor: '#0057a4', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: wp(80), height: hp(20) }}>
                    <Image
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUUr-6KsgpTOBqasj_EQab6jPZ4-G9PKxFtM7teXJ-ZciX7Zkv44Lnm90IDbcvW1st8w&usqp=CAU' }}
                        style={{ flex: 1 }} />
                </View>
            </View>
        )
    }
}

export default LoginPage

//19-04-2021
// buat fungsi login
/*
1. menerima param: uname & password
2. jika user ada => simpan datanya ke reducer dan disimpan di async storage (untuk keepLogin), dan tampilkan di console.log di action dan reducer
3. Jika user tidak ada => console.log("user not found")
*/

//20-04-2021
/*
Buat fungsi register
dibuat di paling bawah page login

1. Buat page register, tambahkan fungsi untuk mengarahkan ke page register
2. Buat fungsi untuk register

*/