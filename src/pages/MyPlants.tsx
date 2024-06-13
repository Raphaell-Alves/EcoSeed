import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text, Image, FlatList, Alert} from 'react-native';
import { Header } from "../components/Header";
import water from '../assets/pingo.png';
import colors from "../styles/colors";
import { PlantProps, removePlant, loadPlant } from "../libs/storage";
import { formatDistance } from "date-fns";
import {pt} from 'date-fns/locale';
import fonts from "../styles/fonts";
import { PlantCardMyPlant } from "../components/PlantCardMyPlant";


export function MyPlants() {
    const [MyPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWatered] = useState<string>();

    function handleRemove(plant: PlantProps) {
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`,[
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: async () => {
                    try {
                        await removePlant(plant.id);
                        setMyPlants((oldData) => (
                            oldData.filter((item) => item.id !== plant.id)
                        ));
                    } catch (error) {
                        Alert.alert('erro');
                    }
                }
            }
        ])
    }

    useEffect(() => {
        async function loadStorageData(){
            const plantsStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: pt}
            );

            setNextWatered(
                `Não esqueça de regar ${plantsStoraged[0].name} à ${nextTime} horas.`
            )

            setMyPlants(plantsStoraged);
            setLoading(false);

        }
        loadStorageData();
    },[])





    return (
        <View style={styles.container}>
            <Header/>

        <View style={styles.luz}>
            <Image
            source={water}
            style={styles.displayImage}
            />
            <Text style={styles.displayText}>
                {nextWaterd}
            </Text>
        </View>

        <View style={styles.plants}>
            <Text style={styles.Title}>
                Proximas regadas
            </Text>

            <FlatList
            data={MyPlants}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) =>(
                <PlantCardMyPlant 
                data={item}
                handleRemove={() => {handleRemove(item)}}
                />
            )}
            showsVerticalScrollIndicator={false}
            
            
            />


        </View>


        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    luz: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius:20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    displayImage: {
        width: 60,
        height: 60
    },
    displayText:{
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
        
    },
    plants: {
        flex: 1,
        width:'100%'
    },
    Title: {
        fontSize:24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
});