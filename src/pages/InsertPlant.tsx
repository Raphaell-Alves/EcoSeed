import React, { useState } from "react";
import {Alert, StyleSheet, Text, View, Image, Platform, TouchableOpacity} from 'react-native';
import { SvgFromUri } from "react-native-svg";

import water from '../assets/pingo.png';
import { Button } from "../components/Button";
import colors from "../styles/colors";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useNavigation, useRoute } from "@react-navigation/core";
import DateTimePicker, {  DateTimePickerEvent } from '@react-native-community/datetimepicker';
import fonts from "../styles/fonts";
import { format, isBefore } from 'date-fns';
import { PlantProps, PlantsautoSave } from "../libs/storage";

interface Params {
    plant: PlantProps
    
}

export function InsertPlant(){
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');


    const route = useRoute();
    const {plant} = route.params as Params

    const navigation = useNavigation();

    function handleChangeTime(event: DateTimePickerEvent, date?: Date){
        if(Platform.OS === 'android'){
            setShowDatePicker(oldState => !oldState);
        }

        if(date && isBefore(date, new Date())){
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro! ⏰');
        }

        if(date)
            setSelectedDateTime(date);
    }


    function handleOpen(){
        setShowDatePicker(oldState => !oldState);
    }



    async function handleSave(){
        try{
            await PlantsautoSave({
                ...plant,
                dateTimeNotification: selectedDateTime
            });

            navigation.navigate('MyPlants')

            
        }catch{
            Alert.alert('error ao salvar')
        }
    }


    return (

    <View style={styles.container}>
        <View style={styles.plantInfo}>
            <SvgFromUri
            uri={plant.photo}
            height={150}
            width={150}
            />

            <Text style={styles.plantName}>
                {plant.name}
            </Text>

            <Text style={styles.plantAbout}>
                {plant.about}
            </Text>
        </View>

        <View style={styles.controller}>
            <View style={styles.tipContainer}>
                <Image
                source={water}
                style={styles.tipImage}
                />

                <Text style={styles.tipText}>
                    {plant.water_tips}
                </Text>
            
            </View>

            <Text style={styles.alertLabel}>
                Escolha o melhor horário para ser lembrado:
            </Text>

            {showDatePicker && (
                        <DateTimePicker
                        value={selectedDateTime}
                        mode="time"
                        display="spinner"
                        onChange={handleChangeTime}
                        />
                    )}
            {
                
                Platform.OS === 'android' && (
                    <TouchableOpacity
                    style={styles.dateTimePickerButton}
                    onPress={handleOpen}>

                    <Text style={styles.dateTimePickerText}>
                        {`Lembrete ${format(selectedDateTime, 'HH:mm')}`}
                    </Text>
                    </TouchableOpacity>

                )

            }

            <Button
            title="Cadastrar planta"
            onPress={handleSave}
            />

        </View>
     </View>
     
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    controller: {
        backgroundColor:colors.white,
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 14,
        marginTop: 10,
        
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 10,
        borderRadius: 10,
        position: 'relative',
        bottom: 60,
        
    },
    tipText:{
        flex: 1,
        marginLeft: 10,
        marginTop: 10,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 13,
        textAlign: 'justify',
    },
    tipImage:{
        width: 36,
        height: 36,
    },
    alertLabel:{
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 10,
        marginBottom: 5
    },
    dateTimePickerText:{
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    },
    dateTimePickerButton:{
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },

})