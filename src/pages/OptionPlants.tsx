import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList} from 'react-native';
import { Header } from "../components/Header";
import { CatalogButton } from "../components/CatalogButton";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import api from "../services/api";
import { PlantCardCatalog } from "../components/PlantCardCatolog";
import { useNavigation } from "@react-navigation/native";
import { PlantProps } from "../libs/storage";

interface EnviromentProps {
    key: string;
    title: string;
}



export function OptionPlants(){
    const [enviroments, setEnvirtmoments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [enviromentSelected, setSelected] = useState('all');
    const navigation = useNavigation();

    function handleSelected(environment: string){
        setSelected(environment);

        if(environment == 'all')
            return setFilteredPlants(plants);

        const filtered = plants.filter(plant =>
            plant.environments.includes(environment)
        );
        setFilteredPlants(filtered);
    } 

    function handleOptionPlants(plant: PlantProps) {
        navigation.navigate('InsertPlant', {plant});
    }

    useEffect(() => {
        async function fetchEnviroment() {
            const {data} = await api.get('plants_environments?_sort=title&_order=asc');
            setEnvirtmoments([
                {
                    key: 'all',
                    title: 'Todos',
                },
                ...data
            ]);
        }

        fetchEnviroment();
    },[])

    useEffect(() => {
        async function fetchPlants() {
            const {data} = await api.get('plants?_sort=name&_order=asc');
            setPlants(data);
        }

        fetchPlants();
    },[])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <Header/>

            <Text style={styles.title}>
                Vamos começar!
            </Text>
            <Text style={styles.subtitle}>
                Selecione uma planta do nosso catálogo{'\n'}
                Para receber dicas e avisos Preciosos!
            </Text>
            </View>

            <View>
                <FlatList data={enviroments}
                keyExtractor={(item) => String(item.key)}
                renderItem={({item}) => (
                    <CatalogButton 
                    title={item.title}
                    active={item.key === enviromentSelected}
                    onPress={() => handleSelected(item.key)}
                    
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.enviromentList}
                />     
            </View>

            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item})=>(
                        <PlantCardCatalog 
                        data={item} 
                        onPress={() => handleOptionPlants(item)}
                        
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    contentContainerStyle={styles.contentContainerStyle}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
    contentContainerStyle:{
        
    }
});