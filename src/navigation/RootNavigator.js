import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';
import AppNavigator from './AppNavigator';
import AboutScreen from '../screens/AboutScreen';
import { TAB_BAR_ICON_SIZE } from '../constants/styleConstants';

 export default createBottomTabNavigator({
    AppRoot: {
        path: '/',
        screen: AppNavigator,
        navigationOptions: {
            tabBarIcon: ({focused, tintColor}) => {
                return (
                    <Icon color={tintColor} name={"camera"} size={TAB_BAR_ICON_SIZE} />
                )
            },
            tabBarLabel: 'Code Reader'
        }
    },
    About: {
        screen: AboutScreen,
        navigationOptions: {
            tabBarIcon: ({focused, tintColor}) => {
                return (
                    <Icon color={tintColor} name="help" size={TAB_BAR_ICON_SIZE} />
                )
            },
            tabBarLabel: 'About App'
        }
    }
 }, {
     lazy: true,
     tabBarOptions: {
        showIcon: true,
        labelStyle: {
            fontSize: 13
        }
    }
 });