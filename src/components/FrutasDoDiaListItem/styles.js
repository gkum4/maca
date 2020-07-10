import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 5,
    width: deviceWidth/2 - 40,
    height: deviceHeight * 0.26,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dbd5d5',
    flex: 1,
  },
  checkButtonContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  frutaImg: {
    width: deviceWidth/2 - 110,
    height: deviceWidth/2 - 110,
  },
  frutaNameText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 15,
  },
})