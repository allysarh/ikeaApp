import { GET_LOGIN, LOGOUT } from "../action/type"

const INITIAL_STATE = {
    id: null,
    username: '',
    email: '',
    role: '',
    cart: [],
    loading: false
}

export const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LOGIN:
            delete action.payload.password
            // console.log("data reducer", action.payload)
            return {
                ...state, ...action.payload, loading: false
            }
        case "UPDATE_CART":
            return {...state, cart: action.payload}
        case "LOADING":
            return {...state, loading: true}
        case LOGOUT:
            console.log("masuk ke case logout")
            return INITIAL_STATE
        default:
            return state
    }
}