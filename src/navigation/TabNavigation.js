import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../pages/HomePage';
import CartPage from '../pages/CartPage';
import ProfilePage from '../pages/ProfilePage';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator()

// di import ke stack navigation
const TabNavigation = (props) => {
    return (
        <Tab.Navigator initialRouteName="Home"
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ color }) => {
                        let iconName;
                        // mengarah pada name dari routing page nya
                        if (route.name === "Home") {
                            iconName = "home"
                        } else if (route.name === "Cart") {
                            iconName = "shopping-bag"
                        } else if (route.name === "Profile") {
                            iconName = "user"
                        }
                        return <Icon type="feather" name={iconName} size={25} color={color}/>
                    }
                })
            }
            
            tabBarOptions={{
                activeTintColor: '#0057a4',
                showLabel: false
            }}
            >
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Cart" component={CartPage}/>
            <Tab.Screen name="Profile" component={ProfilePage} />
        </Tab.Navigator>
    )
}

export default TabNavigation