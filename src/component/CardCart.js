import React, { useState } from 'react';
import { Body, Card, CardItem, CheckBox, Left, ListItem, Right, Thumbnail } from 'native-base'
import { Button, Icon, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {URL_API} from '../helper'
import { updateCart } from '../action/UserAction';

const CardCart = (props) => {
    const [checked, setChecked] = useState(false)
    const dispatch = useDispatch()

    const {cart, idUser} = useSelector(({UserReducer}) =>{
        return{
            cart: UserReducer.cart,
            idUser: UserReducer.id
        }
    })
    const onBtnQty = async (type, idx) =>{
        if(type === "inc"){
            cart[idx].qty += 1
        } else if(type === "dec"){
            if(cart[idx].qty > 1){
                cart[idx].qty -= 1
            }
        }

        cart[idx].total = cart[idx].qty * cart[idx].harga
        
        try {
            let updateQty = await axios.patch(URL_API + `/users/${idUser}`, {cart: cart})
            console.log("hasil update qty in cart", updateQty.data.cart)
            dispatch(updateCart(updateQty.data.cart))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Card>
            <CardItem>
                <Left>
                    <CheckBox checked={checked} color="green" onPress={() => setChecked(!checked)} style={{margin: '-2%', borderColor: 'black'}}/>
                    <Thumbnail source={{ uri: props.image }} style={{marginLeft: '10%'}} />
                    <Body>
                        <Text>{props.nama}</Text>
                        <Text>IDR. {props.total}</Text>
                    </Body>
                </Left>
                <Right style={{flex: 1,flexDirection: 'row', justifyContent: 'center'}}>
                    <Button type="outline" icon={
                        <Icon type="feather" name="minus" size ={15}/>
                    } onPress={() => onBtnQty("dec", props.index)}/>
                    <Text h4 style={{marginHorizontal: 10}}>{props.qty}</Text>
                    <Button type="outline" icon={
                        <Icon type="feather" name="plus" size ={15}/>
                    } onPress={()=> onBtnQty("inc", props.index)}/>
                </Right>
            </CardItem>
        </Card>
    )
}

export default CardCart