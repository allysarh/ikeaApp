import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/routers';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { SafeAreaView } from 'react-native';
import { ScrollView, FlatList, ImageBackground, Text, View, StyleSheet } from 'react-native';
import { Button, Divider, Header, Icon, SearchBar } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../action'
import { getProductAction } from '../action/ProductAction';
import CardProduct from '../component/CardProduct';
import { URL_API } from '../helper';


//STYLING 
const style = StyleSheet.create({
    searchBar: {
        width: wp(60),
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        padding: 0,
        height: hp(5),
        marginLeft: wp(-5)
    },
    inputSearch: {
        backgroundColor: 'white',
        height: hp(5)
    }
})
const HomePage = (props) => {
    const dispatch = useDispatch()
    const [banner, setBanner] = useState([])
    const [produk, setProduk] = useState([])

    const { idUser } = useSelector(({ UserReducer }) => {
        return {
            idUser: UserReducer.id
        }
    })

    const { produkList } = useSelector(({ ProductReducer }) => {
        return {
            produkList: ProductReducer.produk_list
        }
    })

    useEffect(() => {
        getBanner()
        dispatch(getProductAction())
    }, [])

    const getBanner = async () => {
        console.log("PL", produkList)
        try {
            let getBanner = await axios.get(URL_API + `/banner`)
            console.log("get data banner", getBanner.data)
            setBanner(await getBanner.data)
            console.log("state banner", banner)
        } catch (error) {
            console.log("error get data banner", error)
        }
    }

    const getProduct = async () => {
        try {
            let getProduct = await axios.get(URL_API + `/products`)
            console.log("get data produk", getProduct.data)
            setProduk(await getProduct.data)
            console.log("state produk", produk)
        } catch (error) {

        }
    }

    const printProduk = () => {
        return produkList.map((item, index) => {
            return (
                <View style={{ width: wp(50) }}>
                        <CardProduct data={item} keyExtractor={index} />
                </View>
            )
        })
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header
                placement="left"
                centerComponent={
                    <SearchBar
                        placeholder="Search products..."
                        containerStyle={style.searchBar}
                        inputContainerStyle={style.inputSearch}
                    />}
                backgroundColor="#0057a4"
                rightComponent={
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                        <Icon name="heart" type="feather" size={23}
                            iconStyle={{ color: 'white' }} style={{ marginHorizontal: wp(2) }} />
                        <Icon name="message-circle" type="feather" size={23}
                            iconStyle={{ color: 'white' }} style={{ marginHorizontal: wp(2) }} />
                        {/* <Icon name="shopping-cart" type="feather" size={23}
                            iconStyle={{ color: 'white' }} style={{ marginHorizontal: wp(2) }} /> */}
                        <Icon name="bell" type="feather" size={23}
                            iconStyle={{ color: 'white' }} style={{ marginHorizontal: wp(2) }} />
                    </View>}
            />
            <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
                <View style={{ margin: '1%' }}>
                    {/* FlatList semacam scroll view tapi bisa lgsg render item jadi gausah bikin fungsi print data */}
                    <FlatList
                        data={banner}
                        renderItem={({ item }) => (
                            <ImageBackground source={{ uri: item }} style={{ width: wp(90), height: hp(15) }} />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Telusuri Koleksi Kami</Text>
                    <View>
                        <View>
                            <View>
                                {/* <Image source={{uri: ''}}/> */}
                            </View>
                            <View>

                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ margin: '1%', fontWeight: 'bold' }}>Produk kami</Text>
                    <Text style={{ margin: '1%' }}>Lihat semua</Text>
                </View>
                <View style={{ backgroundColor: 'white', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {printProduk()}
                </View>
            </ScrollView>
            {/* <Text>Ini Home Page</Text> */}
            {/* <Button title="Logout" onPress={onBtnLogout} /> */}
        </View>
    )
}

export default HomePage