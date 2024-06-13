import React from "react";
import { createStackNavigator } from '@react-navigation/stack';


import { Welcome } from "../pages/Welcome";
import { GetUserInfo } from '../pages/GetUserInfo';
import { ConfirmCatalogScreen } from '../pages/ConfirmCatalogScreen';

import { InsertPlant } from "../pages/InsertPlant";


import colors from "../styles/colors";
import AuthRoutes from "./tab.routes";



const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
    
    screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor:colors.white},
    
    
    }}
    >
    <stackRoutes.Screen 
            name="Welcome"
            component={Welcome}
        />

        <stackRoutes.Screen 
            name="GetUserInfo"
            component={GetUserInfo}
        />

        <stackRoutes.Screen 
            name="ConfirmCatalogScreen"
            component={ConfirmCatalogScreen}
        />

        <stackRoutes.Screen 
            name="OptionPlants"
            component={AuthRoutes}
        />

        <stackRoutes.Screen 
            name="InsertPlant"
            component={InsertPlant}
        />

        <stackRoutes.Screen 
            name="MyPlants"
            component={AuthRoutes}
        />

    </stackRoutes.Navigator>
)

export default AppRoutes;