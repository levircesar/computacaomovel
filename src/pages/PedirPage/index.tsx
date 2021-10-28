import React, { useEffect, useState } from 'react';
import { View , ImageBackground, Text, Linking,Platform,StyleSheet  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import giveClassesBgImage from '../../assets/images/give-classes-background.png';
import styles from './styles';
import api from '../../services/api';
import * as Location from 'expo-location';
interface Props{
  dados: {
    distancia:{
      distance: string
      distance_earth_radians: number
      unit: string
      toString: any
    }
    mylocation:{
      lat: number
      lon: number
    }
    estacao:{
      localizacao:[]
      nome: string
      geometry: any;
      type: string
      properties : {
        qtd_bikes_disp_1: string
        statusInterno:string
        status_operacional:string
        qtd_bikes_total:string
        nome: string
        endereco:string
        qtd_bikes_disp_2:string
        id: number
        status_online:string
      }
    } 
  }
}

function PedirPage() {
  const [location, setLocation] = useState<any>({});
  const [errorMsg, setErrorMsg] = useState('');
  const [estacaoProxima , setEstacaoProxima] = useState<Props | undefined>()

  const {goBack} = useNavigation();

  function handleNavigateBack(){
    goBack();
  }

  function handleNavigateToWeb(){
    Linking.openURL('https://levirlemos.online');
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    })();
  }, []);

  async function getLocation(){
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });
  }

  setTimeout(() => {
    getLocation()
    console.log(location)
  }, 3000);

  function handleGetEstacaoProxima(){
    api.post('bike/cordenadas', {
      "latitude": 	location.latitude,
      "longitude":  location.longitude,
    }).then(res=>{
      const result = res.data;
      console.log(result)
      setEstacaoProxima(result)
    })
  }
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <View style={styles.container}>
       {/*
      <ImageBackground 
      resizeMode="contain" 
      source={giveClassesBgImage} 
      style={styles.content}
      >
        
      </ImageBackground>
      */}
      <View style={styles.container}>
        <Text>{text}</Text>
      </View>
      <Text style={styles.title}>Página Pedir</Text>
      <Text style={styles.description}>
          Template padrão
      </Text>
      <RectButton onPress={handleNavigateToWeb}  style={styles.okButtonPlataform}>
        <Text style={styles.okButtonText}>Ir para um link</Text>
      </RectButton>

      <RectButton onPress={handleGetEstacaoProxima}  style={styles.okButtonPlataform}>
        <Text style={styles.okButtonText}>Estação mais próxima</Text>
      </RectButton>

      <RectButton onPress={handleNavigateBack} style={styles.okButton}>
        <Text style={styles.okButtonText}>Voltar</Text>
      </RectButton>

      {estacaoProxima != null &&(    
        <>
        <Text>
            {estacaoProxima.dados.estacao.properties.nome}
          </Text>
          <Text>
          {estacaoProxima.dados.distancia.distance}
          </Text>
          <Text>
            {estacaoProxima.dados.estacao.properties.qtd_bikes_total}
          </Text>
          <Text>
            {estacaoProxima.dados.estacao.properties.endereco}
          </Text>
        </>
  
      )}
    </View>
  );
}

export default PedirPage;
