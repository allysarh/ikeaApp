import axios from 'axios';
import { CardItem, ListItem, Card, Left, Right, Thumbnail, Body, Badge } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { FlatList, View, Image } from 'react-native';
import { Button, Overlay, Text } from 'react-native-elements';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { getProductAction } from '../action/ProductAction';
import { URL_API } from '../helper';

const TransactionPage = (props) => {
    const [userTrans, setUserTrans] = useState([])
    const [visible, setVisible] = useState(false)
    const [detail, setDetail] = useState([])
    const [produk, setProduk] = useState([])
    const dispatch = useDispatch()

    const { idUser } = useSelector(({ UserReducer }) => {
        return {
            idUser: UserReducer.id
        }
    })

    useEffect(() => {
        getTransaksi()
        getProduct()
    }, [])

    const getProduct = async () => {
        try {
            let getProduct = await axios.get(URL_API + `/products`)
            console.log("get data produk", getProduct.data)
            setProduk(getProduct.data)
            console.log("state produk", produk)
        } catch (error) {
            console.log("err", error)
        }
    }

    const getTransaksi = async () => {
        try {
            let transactions = await axios.get(URL_API + `/transactions`)
            // console.log("get transactions data", transactions.data)
            let transaksiUser = transactions.data.filter(item => item.idUser === idUser)
            // console.log("transaksi user", transaksiUser)
            setUserTrans(transaksiUser)
            // console.log("transaksi user state", userTrans)
        } catch (error) {
            console.log("err get transactions", error)
        }
    }

    const onBtnPay = (id, index) => {
        // console.log("user tranns", userTrans[index].detailPembelian)
        axios.patch(URL_API + `/transactions/${id}`, { status: 'paid' })
            .then((res) => {
                console.log("hasil patch unpaid --> paid", res.data)
                userTrans[index].detailPembelian.forEach((item, index) => {
                    produk.forEach((val, idx) => {
                        if (item.nama === val.nama) {
                            let idxStok = val.stok.findIndex(val => {
                                return val.type === item.type
                            })

                            val.stok[idxStok].qty -= item.qty

                            axios.patch(URL_API + `/products/${val.id}`, {
                                stok: val.stok
                            })
                                .then((res) => {
                                    console.log("respon patch produk", res.data)
                                    dispatch(getProductAction())
                                }).catch(err => console.log(err))
                        }
                    })
                })

                getTransaksi()
            })
            .catch(err => console.log("err unpaid -> paid", err))
    }

    const onBtnDetail = (detail) => {
        setVisible(!visible)
        setDetail(detail)
    }

    const printDetail = () => {
        console.log("masuk print detail")
        return detail.map((item, index) => {
            return (
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: item.image }} style={{ width: wp(30), height: wp(30) }} />
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>Nama: {item.nama}</Text>
                        <Text>Jumlah: {item.qty}</Text>
                    </View>
                </View>
            )
        })
    }
    const printTransaksi = () => {
        return userTrans.map((item, index) => {
            return (
                <Card>
                    <CardItem style={{ textAlign: 'center', justifyContent: 'space-between' }}>
                        <Text>
                            Tanggal Transaksi: {item.date}
                        </Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{marginHorizontal: wp(2)}}>
                                Status:
                            </Text>
                            {
                                item.status === "paid" ?
                                    <Badge success >
                                        <Text style={{marginHorizontal: wp(2)}}>
                                            {item.status}
                                        </Text>
                                    </Badge>
                                    :
                                    <Badge danger>
                                        <Text>
                                            {item.status}
                                        </Text>
                                    </Badge>
                            }
                        </View>
                    </CardItem>
                    {
                        item.status === "unpaid" ?
                            <Button title="Pay Now"
                                titleStyle={{ color: '#0057a4', fontWeight: 'bold' }}
                                buttonStyle={{ backgroundColor: '#f7c600' }}
                                onPress={() => onBtnPay(item.id, index)} />
                            :
                            <Button title="Detail"
                                titleStyle={{ color: 'white', fontWeight: 'bold' }}
                                buttonStyle={{ backgroundColor: '#0057a4' }}
                                onPress={() => onBtnDetail(item.detailPembelian)} />
                    }
                </Card>
            )
        })
    }
    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                {/* <Text h1>Ini Transactions page</Text> */}
                <Overlay style={{ width: wp(80) }} isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
                    <Text h4>Detail Transaksi Anda:</Text>
                    {printDetail()}
                </Overlay>
                {
                    userTrans.length > 0 ?
                        printTransaksi()
                        :
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: wp(70) }}>
                            <Text h4 style={{ textAlign: 'center' }}>You haven't made any transactions yet!</Text>
                        </View>
                }
            </View>
        </ScrollView>
    )
}

export default TransactionPage
/** TUGAS TRANSAXION PAGE
 * Buat tampilan transaction berupa card seperti card page
 * TGL, status, button paid jika masih unpaid
 * jika status sudah paid button paid -> detail
 * Button detail u  menampilkan detail transaksi pada overlay(gambar, nama, dan qty)
 * kurangi kuantiti produk saat statusnya berubah paid
 */