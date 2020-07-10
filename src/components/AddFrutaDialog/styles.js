import { StyleSheet } from 'react-native';

export default StyleSheet.create({
   dialogInputContainer: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   dialogInputTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
   },
   dialogMiddleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
   },
   dialogInputsContainer: {
      flexDirection: 'column'
   },
   dialogFrutaImgContainer: {
      backgroundColor: '#F5EEE4',
      marginRight: 20,
      padding: 12.5,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: '#DBD5D5',
      
   },
   dialogFrutaImg: {
      width: 45,
      height: 45,
   },
   dialogFrutaNomeInput: {
      backgroundColor: '#E0E0E0',
      width: 200,
      marginBottom: 10,
      borderRadius: 15,
      height: 35,
   },
   dialogFrutaDataInput: {
      backgroundColor: '#E0E0E0',
      width: 200,
      borderRadius: 15,
      height: 35,
      marginBottom: 10,
   },
   dialogFrutaQuantidadeInput: {
      backgroundColor: '#E0E0E0',
      width: 200,
      borderRadius: 15,
      height: 35,
   },
   dialogBottomContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   dialogButtonVoltar: {
      flex: 1,
      marginRight: 5,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#CBC8C8',
      borderRadius: 15,
   },
   dialogButtonOk: {
      flex: 1,
      height: 35,
      marginLeft: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#CBC8C8',
      borderRadius: 15,
   },
})