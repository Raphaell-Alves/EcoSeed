import React from 'react';
import { SafeAreaView, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import plantacaoImg from   '../assets/plantacao.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';




export function Welcome(){

    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('GetUserInfo');        
    }


    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
                Cultive Saúde e Sustentabilidade!
            </Text>

            <Image source={plantacaoImg} style={styles.image} resizeMode='contain' />

            <Text style={styles.subtitle}>
            Bem-vindo ao Eco Seed! Seu guia para um cultivo sustentável e um estilo de vida mais saudável começa aqui.
            </Text>

            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleStart}>
                <Text>
                   <Entypo name='tree' style={styles.buttonIcon}/>
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 34
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 22,
        paddingHorizontal: 20,
        color: colors.heading,
        
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 58,
        width: 58
    },
    image: {
        height: Dimensions.get('window').width * 0.9
    },
    buttonIcon: {
        color: colors.white,
        fontSize: 40
    }
});