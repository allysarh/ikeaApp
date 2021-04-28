import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { Card, CardItem, Form, Item, Picker, Badge } from 'native-base';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Button, Divider, Icon, Overlay, Input, AirbnbRating } from 'react-native-elements';
import { add } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { URL_API } from '../helper';
import { onLogin, updateCart } from '../action/UserAction';
import { useNavigation } from '@react-navigation/native';

const DetailPage = ({ route, navigation }) => {
    const { data } = route.params
    // console.log(data.images)
    const [thumbnail, setThumbnail] = useState(0)
    const [selected, setSelected] = useState(undefined)
    const [visible, setVisible] = useState(false);
    const [qty, setQty] = useState(0)
    const dispatch = useDispatch()

    const toggleOverlay = () => {
        if (selected === undefined) {
            alert("Choose type!")
        } else {
            setVisible(!visible)
        }
    };

    // fungsi value change
    const onValueChange2 = (value) => {
        setSelected(value)
    }

    const printImages = () => {
        return data.images.map((item, index) => {
            return (
                <TouchableOpacity onPress={() => setThumbnail(index)}>
                    <View key={index} style={{ flexDirection: 'column', margin: '3%' }}>
                        <Image source={{ uri: item }} style={{ height: hp(10), width: wp(17), flex: 1 }} />
                    </View>
                </TouchableOpacity>
            )
        })
    }

    const { cart, id } = useSelector(({ UserReducer }) => {
        return {
            cart: UserReducer.cart,
            id: UserReducer.id
        }
    })

    const addToCart = async () => {
        let type = selected.split(",")[0]
        let index = selected.split(",")[1]
        // console.log("qty", qty)

        if (qty > 0) {
            if (qty <= data.stok[index].qty) {
                // console.log("cart", cart)
                let harga = data.harga
                let image = data.images[0]
                let nama = data.nama
                let total = qty * harga

                // console.log("---->", { qty, nama, harga, total, image, type })

                let index2 = cart.findIndex(item => item.nama === nama && item.type === type)

                if (index2 >= 0) {
                    cart[index2].qty += qty
                    cart[index2].total = cart[index].qty * harga
                } else {
                    // fungsi patch
                    cart.push({ nama, image, type, qty, harga, total })
                }

                try {
                    let patchCart = await axios.patch(URL_API + `/users/${id}`, { cart: cart })
                    console.log("hasil patch", patchCart.data)
                    dispatch(updateCart(patchCart.data.cart))
                    alert("Add to Cart Success✅✅")
                    setQty(0)
                    toggleOverlay()
                    navigation.navigate("Cart")
                } catch (error) {
                    console.log("error patch cart", error)
                }

            } else {
                alert("Out of stok!")
            }
        } else {
            alert("Please input quantity!")
        }

    }

    return (
        <ScrollView key={12}>
            <View style={{ backgroundColor: 'white' }}>
                <Card>
                    <CardItem cardBody style={{ padding: '15%' }}>
                        <Image source={{ uri: data.images[thumbnail] }} style={{ height: hp(37), width: wp(90), flex: 1 }} />
                    </CardItem>
                    <CardItem style={{ display: 'flex', justifyContent: 'center', margin: '1%' }}>
                        {printImages()}
                    </CardItem>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ margin: '3%' }}>
                            <Badge warning style={{ height: 'auto' }}>
                                <Text style={{ fontSize: 15, margin: 5 }}>{data.kategori}</Text>
                            </Badge>
                            <Text style={{ fontSize: 22 }}>{data.nama}</Text>
                            <Text style={{ fontSize: 20 }}>IDR {data.harga}</Text>
                            <Text>{data.deskripsi}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ width: wp(30) }}>Type:</Text>
                                <CardItem>
                                    <Form>
                                        <Item picker>
                                            <Picker
                                                mode="dialog"
                                                // iosIcon={<Icon name="arrow-down" />}
                                                style={{ width: wp(60), height: hp(5) }}
                                                placeholder="Select product type"
                                                placeholderStyle={{ color: "#bfc6ea" }}
                                                placeholderIconColor="#007aff"
                                                selectedValue={selected}
                                                onValueChange={onValueChange2}
                                            >
                                                <Picker.Item label="Choose type..." value="" />
                                                {
                                                    data.stok.map((item, index) => {
                                                        return <Picker.Item label={`${item.type} Stok: ${item.qty}`} value={`${item.type},${index}`} />
                                                    })
                                                }
                                            </Picker>
                                        </Item>
                                    </Form>

                                </CardItem>

                            </View>

                        </View>
                        <View style={{ marginRight: '5%', flexDirection: 'row' }}>
                            <Icon name="share-2" type="feather" size={22} style={{ margin: '5%' }} onPress={() => alert("hai")} />
                            <Icon name="heart" type="feather" size={22} style={{ margin: '5%' }} onPress={() => alert("hai")} />
                        </View>
                    </View>
                    <View style={{ padding: '5%' }}>
                        <Button
                            icon={
                                <Icon name="shopping-cart" type="feather" color="#0057a4" style={{ margin: '3%' }} />
                            }
                            title="Add to Cart"
                            titleStyle={{ color: '#0057a4', fontWeight: 'bold' }}
                            buttonStyle={{ backgroundColor: '#f7c600' }}
                            onPress={toggleOverlay}
                        />
                    </View>
                </Card>
            </View>

            {/* MODAL */}
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                {/* <Text>Masukkan jumlah yang diinginkan:</Text> */}
                <Input onChangeText={e => setQty(parseInt(e))}
                    placeholder={`Masukkan jumlah barang`}
                    containerStyle={{ width: wp(75) }} />
                <Button
                    icon={
                        <Icon name="shopping-cart" type="feather" color="#0057a4" style={{ margin: '3%' }} />
                    }
                    title="Ok"
                    titleStyle={{ color: '#0057a4', fontWeight: 'bold' }}
                    buttonStyle={{ backgroundColor: '#f7c600' }}
                    onPress={addToCart}
                />
            </Overlay>

        </ScrollView>
    )
}

export default DetailPage