import { GET_PRODUCT, UPDATE_PRODUCT } from "../action/type"

const INITIAL_STATE = {
    produk_list: []
}

export const ProductReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCT:
            console.log("produk reducer", action.payload)
            return { ...state, produk_list: action.payload }
        case UPDATE_PRODUCT:
            return { ...state, produk_list: action.payload }
        default:
            return state
    }
}