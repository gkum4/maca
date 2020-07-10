import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
   scroll: {
      flex: 1,
   },
   container:{
      backgroundColor: '#F5EEE4',
      alignItems:'center',
      justifyContent: 'center',
      width: deviceWidth,
      height: deviceHeight - 90,
   },
   inputTitleText: {
      fontWeight: 'bold',
      fontSize: 21,
   },
   textInput: {
      fontSize: 21,
      textAlign: 'center',
      borderBottomWidth: 1,
      width: 50,
      alignSelf: 'center',
      marginTop: 15,
      marginBottom: 30,
   },
   containerGit:{
      flexDirection: 'row',
      alignSelf: 'center',
      marginBottom: 30,
   },
   gitButton:{
      alignItems: 'center',
   },
});

export default styles;