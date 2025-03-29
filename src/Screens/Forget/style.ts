import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from '../../Utils/Constants/Colors';

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgLogo: {
    width: 250,
    height: 200,
  },
  txtLogin: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: Colors.black,
  },
  containerInput: {
    marginTop: 10,
  },
  input: {
    backgroundColor: '#E4E4E4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 15,
    gap: 5,
  },
  txtInput: {
    width: '80%',
    color: Colors.darkGrey,
  },
  containTxtDontAccount: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
  txtDontAccount: {
    color: Colors.darkGrey,
  },
  txtSignUp: {
    color: Colors.blueLight,
  },
  btn: {
    backgroundColor: Colors.tint,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    width: width - (width * 50) / 100,
    marginTop: 50,
    alignSelf: 'center',
  },
  btnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  txtErr: {
    color: 'red',
    alignSelf: 'center',
  },
});
export default styles;
