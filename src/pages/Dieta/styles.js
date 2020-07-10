import { StyleSheet } from 'react-native';

const styles =  StyleSheet.create({
   container:{
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: '#F5EEE4',
   },
   boldText: {
      fontWeight: 'bold',
      fontSize: 18,
      paddingTop: 15,
   },
   semFrutasContainer: {
      flex: 1,
      marginTop: 15,
      alignItems: 'center',
      justifyContent: 'center',
   },
   grayText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#A4A4A4',
   },
   semFrutasText: {
      fontSize: 12,
      marginBottom: 15,
   },
   gerarButtonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   gerarFrutasDoDiaButton: {
      backgroundColor: '#1da1f2',
      width: '70%',
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
   },
   gerarFrutasDoDiaButtonText: {
      color: '#fff',
      fontSize: 21,
      fontWeight: 'bold',
   },
   frutasList: {
      flex: 1,
   },
});

export default styles;