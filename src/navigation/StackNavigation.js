import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
// import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DetailPage from '../pages/DetailPage'
import { useDispatch } from 'react-redux';
import { keepLogin } from '../action';
import TabNavigation from './TabNavigation'
import TransactionPage from '../pages/Transaction';
import { getProductAction } from '../action/ProductAction';
const Stack = createStackNavigator()
const StackNavigation = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(keepLogin())
        dispatch(getProductAction())
    }, [])

    return (
        // otomatis dapet header di masing2 page
        // kalo header costum = panggil atribut header
        <Stack.Navigator initialRouteName="Login">
            {/* Pindah ke tab navigation */}
            {/* <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} /> */}
            <Stack.Screen name="TabNav" component={TabNavigation} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={DetailPage} options={{ headerStyle: {backgroundColor: '#0057a4'}, headerTintColor: '#fff'}} />
            <Stack.Screen name="Transaction" component={TransactionPage} options={{ headerStyle: {backgroundColor: '#0057a4'}, headerTintColor: '#fff'}}/>
        </Stack.Navigator>
    )
}

export default StackNavigation;