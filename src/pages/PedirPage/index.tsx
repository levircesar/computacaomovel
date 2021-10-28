import React from 'react';
import { View , ImageBackground, Text, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import giveClassesBgImage from '../../assets/images/give-classes-background.png';
import styles from './styles';

function PedirPage() {

  const {goBack} = useNavigation();

  function handleNavigateBack(){
    goBack();
  }

  function handleNavigateToWeb(){
    Linking.openURL('https://levirlemos.online');
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

      <RectButton onPress={handleNavigateBack} style={styles.okButton}>
        <Text style={styles.okButtonText}>Voltar</Text>
      </RectButton>
    </View>
  );
}

export default PedirPage;