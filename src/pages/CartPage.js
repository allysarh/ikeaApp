import axios from 'axios';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { View } from 'react-native';
import { Button, Divider, Icon, Text } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../action/UserAction';
import CardCart from '../component/CardCart';
import { createLocalNotif, notifConfig, URL_API } from '../helper';

const CartPage = (props) => {
    const [checked, setChecked] = useState(false)
    const dispatch = useDispatch()
    const { cart, idUser, username } = useSelector(({ UserReducer }) => {
        console.log("cart di reducer",UserReducer.cart)
        return {
            cart: UserReducer.cart,
            idUser: UserReducer.id,
            username: UserReducer.username
        }
    })

    const printCart = () => {
        if (cart.length > 0) {
            return cart.map((item, index) => {
                return <CardCart nama={item.nama} total={item.total} image={item.image} key={index} qty={item.qty}
                    checked={checked} changeChecked={() => changeChecked(item)} index={index} />
            })
        } else {
            return <Text h1>You have nothing in your cart!</Text>
        }
    }

    const getTotal = () => {
        if (cart.length > 0) {
            return cart.map((item, index) => item.total).reduce((a, b) => a + b, 0)
        } else {
            return 0
        }
    }

    const onBtnCheckOut = () => {
        let date = new Date()
        let status = "unpaid"
        let totalPayment = getTotal()
        let detailPembelian = cart
        console.log(`${date}, ${status}, ${totalPayment}, ${detailPembelian}`)
        // user transactions: {idUser, username, date, satus, total payment, detail pembelian}

        axios.post(URL_API + `/users/${idUser}/transactions`, { idUser, username, date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`, status, totalPayment, detailPembelian })
            .then((res) => {
                console.log("transactions", res.data)
                let cartReset = []
                axios.patch(URL_API + `/users/${idUser}`, { cart: cartReset })
                    .then((resPatch) => {
                        console.log("reset cart", resPatch.data)
                        dispatch(updateCart(resPatch.data.cart))
                        // bikin notif ke hp
                        notifConfig(() => props.navigation.navigate("Transaction"))
                        createLocalNotif("A1","Checkout✅","Pesanan anda sedang diproses, silahkan lakukan pembayaran")
                        // alert("Checkout success!✅✅")
                        props.navigation.navigate('Profile')
                    })
                    .catch(err => console.log("error", err))
            }).catch(err => console.log("error patch data", err))

    }
    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: hp(4) }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {printCart()}
                </ScrollView>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#f7c600', alignItems: 'center' }}>
                <View style={{ width: wp(60), padding: '3%' }}>
                    <Text h5>Total Payment:</Text>
                    <Divider />
                    <Text h4>IDR. {getTotal()}</Text>
                </View>
                <View style={{ width: wp(40), padding: '3%' }}>
                    <Button
                        icon={
                            <Icon name="credit-card" type="feather" color="white" style={{ margin: '3%' }} size={18} />
                        }
                        title="Checkout"
                        titleStyle={{ color: 'white', fontWeight: 'bold' }}
                        buttonStyle={{ backgroundColor: '#0057a4' }}
                        onPress={onBtnCheckOut}
                    />
                </View>
            </View>
        </>

    )
}

export default CartPage