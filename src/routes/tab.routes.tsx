import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import colors from '../styles/colors';
import { OptionPlants } from '../pages/OptionPlants';
import { MaterialIcons } from '@expo/vector-icons';
import { MyPlants } from '../pages/MyPlants';

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
    return(
        <AppTab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors.yellow,
                tabBarInactiveTintColor: colors.heading,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    paddingVertical: Platform.OS == 'ios' ? 20 : 0,
                    height: 88
                },
            }}>
                <AppTab.Screen
                    name="EcoSeed"
                    component={OptionPlants}
                    options={{
                        tabBarIcon: (({ size, color }) => (
                            <MaterialIcons
                                name="add-circle-outline"
                                size={size}
                                color={color}
                            />
                        ))
                    }}
                />

<AppTab.Screen
                    name="Minhas Plantas"
                    component={MyPlants}
                    options={{
                        tabBarIcon: (({ size, color }) => (
                            <MaterialIcons
                                name="format-list-bulleted"
                                size={size}
                                color={color}
                            />
                        ))
                    }}
                />
            </AppTab.Navigator>
    )
}

export default AuthRoutes;