import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
import { URL_API } from "../helper"
import { GET_LOGIN, LOGOUT } from "./type"

export const getUsers = () => {
    return (dispatch) => {
        axios.get(URL_API + `/users`)
            .then((res) => {
                console.log("getUsers ==> ", res.data)
            })
            .catch(err => console.log("err getUsers ==>", err))
    }
}

// get data login tanpa redux thunk
export const getDataLogin = (data) => {
    console.log("action login", data)
    return {
        type: GET_LOGIN,
        payload: data
    }
}

//get data login dengan redux thunk
export const onLogin = (username, password) => {
    return (dispatch) => {
        console.log("data action", username, password)
        axios.get(URL_API + `/users?username=${username}&password=${password}`)
            .then((res) => {
                console.log("login data:", res.data[0])
                if (res.data.length > 0) {
                    // mengirim data ke reducer
                    console.log("data login", res.data[0])
                    dispatch({
                        type: GET_LOGIN,
                        payload: res.data[0]
                    })
                }
                AsyncStorage.setItem("id", `${res.data[0].id}`)
            })
            .catch(err =>{
                console.log("error data login", err)
                alert("Oopssie! Account not found. Please sign up first.")
            })
    }
}

// tanpa redux thunk
// export const keepLogin = (data) =>{
//     console.log("data masuk keep login", data)
//     return{
//         type: GET_LOGIN,
//         payload: data
//     }
// }

//dengan redux thunk
export const keepLogin = () => {
    // return async: biar bisa menunggu
    return async (dispatch) => {
        try {
            let id = await AsyncStorage.getItem('id')
            console.log('id token', id)
            let res = await axios.get(URL_API + `/users?id=${id}`)
            if(res.data.length > 0){
                // mengirim data ke reducer
                console.log("data keep login", res.data[0])
                dispatch({
                    type: GET_LOGIN,
                    payload: res.data[0]
                })
            }
        } catch (error) {
            console.log("error", error)
        }
    }
}
export const logoutAction = () => {
    return (dispatch) => {
        AsyncStorage.removeItem('id', async (err) =>{
            if(err){
                console.log("error remove item", err)
            }
            let cekLogout = await AsyncStorage.getItem('id')
            console.log("cek logout get item", cekLogout)
        })
        dispatch({
            type: LOGOUT
        })
    }
}

// mengupddate reducer

export const updateCart = (data) =>{
    console.log("data update cart", data)
    return {
        type: "UPDATE_CART",
        payload: data
    }
}

