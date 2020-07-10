import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
   frutasList: {
      flex: 1,
   },
   addButton: {
      position: 'absolute',
      bottom: 21,
      right: 21,
      width: 55,
      height: 55,
      backgroundColor: '#E5E5E5',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 27.5,
      borderWidth: 1,
      borderColor: '#C1C1C1',
   },
});

export default styles;