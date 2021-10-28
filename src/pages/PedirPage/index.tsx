import React, { useState } from 'react';
import { View , ImageBackground, Text, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import giveClassesBgImage from '../../assets/images/give-classes-background.png';
import styles from './styles';
import api from '../../services/api';

interface Props{
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

function PedirPage() {

  const [estacaoProxima , setEstacaoProxima] = useState<Props | undefined>()

  const {goBack} = useNavigation();

  function handleNavigateBack(){
    goBack();
  }

  function handleNavigateToWeb(){
    Linking.openURL('https://levirlemos.online');
  }

  function handleGetEstacaoProxima(){
    api.get('bike/cordenadas').then(res=>{
      const result = res.data;
      console.log(result)
      setEstacaoProxima(result)
    })
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
            {estacaoProxima.estacao.properties.nome}
          </Text>
          <Text>
          {estacaoProxima.distancia.distance}
          </Text>
          <Text>
            {estacaoProxima.estacao.properties.qtd_bikes_total}
          </Text>
          <Text>
            {estacaoProxima.estacao.properties.endereco}
          </Text>
        </>
  
      )}
    </View>
  );
}

export default PedirPage;
