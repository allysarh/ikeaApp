import React, { useEffect } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Body, Right, Item, Badge } from 'native-base'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const CardProduct = (props) => {
    const navigation = useNavigation();

    // useEffect(() => {
    //     getProduct()
    // }, [])

    // const getProduct = async () => {
    //     try {
    //         let getProduct = await axios.get(URL_API + `/products`)
    //         console.log("get data produk", getProduct.data)
    //         setProduk(await getProduct.data)
    //         console.log("state produk", produk)
    //     } catch (error) {

    //     }
    // }
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate("Detail", {
                data: props.data
            })

        }}>
            <Card>
                <CardItem cardBody>
                    <Image source={{ uri: props.data.images[0] }} style={{ height: hp(25), width: wp(100), flex: 1 }} />
                </CardItem>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <View style={{ margin: '5%' }}>
                        <Text style={{ fontWeight: 'bold' }}>{props.data.nama}</Text>
                        <Text>{props.data.kategori}</Text>
                        <Badge warning style={{ marginVertical: '5%' }}>
                            <Text>IDR. {props.data.harga.toLocaleString()}</Text>
                        </Badge>
                    </View>
                    <Icon name="more-horizontal" type="feather" size={22} style={{ margin: '5%' }} onPress={() => alert("hai")} />
                </View>
            </Card>
        </TouchableOpacity>

    )
}

export default CardProduct