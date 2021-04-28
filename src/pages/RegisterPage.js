import axios from 'axios';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import { color } from 'react-native-reanimated';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { getUsers } from '../action';
import { URL_API } from '../helper';

const RegisterPage = (props) => {
    /*---------DECLARING STATES--------------*/
    const [username, setUsername] = useState('')
    // console.log('username', username)
    const [email, setEmail] = useState('')
    // console.log('email', email)
    const [password, setPassword] = useState('')
    // console.log('password', password)
    const [confPassword, setConfPassword] = useState('')
    // console.log('conf password', confPassword)
    const cart = []
    const role = 'user'
    const [passUnshow, setPassUnshow] = useState(true)
    const [confUnshow, setConfUnshow] = useState(true)
    const dispatch = useDispatch()

    /*--------------FUNCTIONS------------*/
    const onBtnSignUp = async () => {
        try {
            if (password === "" || username === "" || email === "" || confPassword === "") {
                alert("Please fill up the form!")
            } else {
                let verifEmail = await axios.get(URL_API + `/users?email=${email}`)
                // console.log("Hasil verif email:", verifEmail.data)
                if(verifEmail.data.length > 0){
                    alert("Email already registered!")
                } else {
                    if (password.match(/[A-Za-z0-9]/ig) && password.length >= 6) {
                        if (email.includes('@')) {
                            if(password === confPassword){
                                try {
                                    let regis = await axios.post(URL_API + `/users`,{
                                        username, email, password, cart, role
                                    })
                                    console.log("hasil regis", regis.data)
                                    alert("Sign in success✅✅")
                                    props.navigation.navigate('Login')
                                } catch (error) {
                                    console.log("err regis data", error)
                                }
                            } else {
                                alert("Password not match! ")
                            }
                        } else {
                            alert("Invalid email")
                        }
                    } else {
                        alert("Invalid password. Use 6 or more characters with a mix of letters and numbers")
                    }
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const onBtnShow = () => {
        setPassUnshow(!passUnshow)
    }

    return (
        <>
            <View style={{ flex: 1, backgroundColor: '#0057a4', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: wp(80), height: hp(20), padding: '5%' }}>
                    <Image
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUUr-6KsgpTOBqasj_EQab6jPZ4-G9PKxFtM7teXJ-ZciX7Zkv44Lnm90IDbcvW1st8w&usqp=CAU' }}
                        style={{ flex: 1 }} />
                </View>
                <Text style={{ color: 'white', margin: '2%' }}>Hej! Register Now</Text>
                <View style={{ width: wp(90) }}>
                    <Input placeholder='Username'
                        leftIcon={
                            <Icon name="user" type="feather" size={22} color="white" />
                        }
                        onChangeText={e => setUsername(e)}
                        placeholderTextColor="white"
                        style={{ color: 'white' }} />
                    <Input placeholder='E-mail'
                        leftIcon={
                            <Icon name="mail" type="feather" size={22} color="white" />
                        }

                        onChangeText={e => setEmail(e)}
                        placeholderTextColor="white"
                        style={{ color: 'white' }}
                    />

                    <Input placeholder='Password' secureTextEntry={passUnshow}
                        leftIcon={
                            <Icon name="lock" type="feather" size={22} color="white" />
                        }
                        onChangeText={e => setPassword(e)}
                        placeholderTextColor="white"
                        style={{ color: 'white' }}
                        rightIcon={
                            <Icon name={passUnshow ? "eye-off" : "eye"} type="feather" size={22} color="white" onPress={() => setPassUnshow(!passUnshow)} />
                        }
                        errorMessage={password ? (password.match(/[0-9]/ig)&& password.match(/[a-z]/ig) && password.length >= 6) ? "Seem OK!" : "Passsword not strong" : "*Use 6 or more characters with a mix of letters and numbers"}
                        errorStyle={{ color: password ? password.match(/[0-9]/ig) && password.match(/[a-z]/ig) && password.length >= 6 ? "green" : "red" : "white" }} />
                    <Input placeholder='Confirm password' secureTextEntry={confUnshow}
                        leftIcon={
                            <Icon name="lock" type="feather" size={22} color="white" />
                        }
                        placeholderTextColor="white"
                        style={{ color: 'white' }}
                        rightIcon={
                            <Icon name={confUnshow ? "eye-off" : "eye"} type="feather" size={22} color="white" onPress={() => setConfUnshow(!confUnshow)} />
                        }
                        errorMessage={confPassword ? (password === confPassword ? "Password match" : "Password not match") : null}
                        errorStyle={{ color: password === confPassword ? "green" : "red" }}
                        onChangeText={e => setConfPassword(e)}
                    />
                </View>
                <Button title="Sign Up" onPress={onBtnSignUp}
                    containerStyle={{ width: wp(50) }}
                    buttonStyle={{ backgroundColor: '#f7c600' }}
                    titleStyle={{ color: '#0057a4', fontWeight: 'bold' }} />
            </View>
            <View style={{ backgroundColor: '#0057a4', alignItems: 'center', padding: '5%' }}>
                <Text style={{ color: 'white' }}>Already have an account? Try
            <Text style={{ color: 'yellow', fontWeight: 'bold' }} onPress={() => props.navigation.navigate('Login')}> Sign In </Text>
            Instead</Text>
            </View>
        </>
    )
}
export default RegisterPage
