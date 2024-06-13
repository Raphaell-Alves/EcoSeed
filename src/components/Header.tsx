import { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import userImg from '../assets/intro.png';
import fonts from "../styles/fonts";
import colors from "../styles/colors";



export function Header(){
    const [userName, setUserName] = useState<string>();

    useEffect(() => {
        async function loadStorageName() {
            const user = await AsyncStorage.getItem('@ecoseed:user');
            setUserName(user || '');
        }
        loadStorageName();
    },[]);



    return (
        <View style={styles.container}>
           <View>
            <Text style={styles.outSet}>Olá,</Text>
            <Text style={styles.userName}>{userName}</Text>
            </View>

            <Image source={userImg} style={styles.image}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight()
    },
    image: {
        width: 100,
        height :100,
        borderRadius: 40
    },
    outSet: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName:{
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }
})



