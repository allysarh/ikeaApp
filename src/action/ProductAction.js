import axios from "axios"
import { URL_API } from "../helper"
import { GET_PRODUCT, UPDATE_PRODUCT } from "./type"

export const getProductAction = () => {
    return (dispatch) => {
        axios.get(URL_API + `/products`)
            .then((res) => {
                console.log("get prd act ==>", res.data)
                dispatch({
                    type: GET_PRODUCT,
                    payload: res.data
                })
            })
            .catch(err => console.log("err gt pr", err))
    }

}

export const updateProduk = (data) => {
    return {
        type: UPDATE_PRODUCT,
        payload: data
    }
}