import React, { useEffect, useState } from 'react';
import { View, Image ,Text, TouchableOpacity} from 'react-native';
//rota de navegacao
import { useNavigation } from '@react-navigation/native';
//rectButton adapta o botao de acordo com o sistema operacional do celular
import { RectButton } from 'react-native-gesture-handler';
import styles from './styles';
import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import api from '../../services/api';


function Landing(){
  const {navigate} = useNavigation();
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('bike').then(res=>{
      const result = res.data;
      setTotalConnections(result.length);
    })
  }, [])
  function handleNavigateToDevolverPage(){
    navigate('DevolverPage');
  }
  
  function handleNavigatePedirPage(){
    navigate('PedirPage');
  }

  
  
  return (
    <View style={styles.container}>
      {
        /**
         <Image source={landingImg} style={styles.banner} />
        */
      }
      <Text style={styles.title}>
        Seja bem vindo , {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>
      
      <View style={styles.buttonsContainer}>
        <RectButton 
          onPress={handleNavigateToDevolverPage}
          style={[styles.button, styles.buttonPrimary]}>
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Devolver</Text>
        </RectButton>

        <RectButton 
          onPress={handleNavigatePedirPage} 
          style={[styles.button, styles.buttonSecondary]}>
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Pedir</Text>
        </RectButton>
      </View>
      
      <Text style={styles.totalConnections}>
        Total de {totalConnections} estações cadastradas {'\n'}
        <Image source={heartIcon}/>
      </Text>

    </View>
  )
}

export default Landing;