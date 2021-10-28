import { StyleSheet } from 'react-native';

//pesquisar sobre styles components 

const styles = StyleSheet.create({
  container:{
   padding:40,
   backgroundColor:'#8257e5',
  },

  topBar:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },

  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems : 'center',
  },

  title:{
    fontFamily: 'Archivo_700Bold',
    color:'#fff',
    fontSize:24,
    lineHeight:32,
    maxWidth:160,
    marginVertical:40,
  }

});

export default styles;