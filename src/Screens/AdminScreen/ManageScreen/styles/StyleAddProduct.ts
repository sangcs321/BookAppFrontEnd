import {Dimensions} from 'react-native';
import {FontSizeText} from '../../../../Utils/Constants/Font';
import {Colors} from '../../../../Utils/Constants/Colors';
import {StyleSheet} from 'react-native';
const WIDTH = (Dimensions.get('screen').width - 30 - 15) / 3;
export const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingTop: 10,
  },
  label: {
    fontSize: FontSizeText.fsSmall,
    marginBottom: 8,
    color: Colors.colorText,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: Colors.colorText,
  },
  containerTitle: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    color: Colors.colorText,
    fontSize: 20,
    fontWeight: '900',
  },
  containBtn: {
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  btn: {
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: Colors.tint,
  },
  txtBtn: {
    color: Colors.white,
    fontSize: FontSizeText.fsMedium,
    fontWeight: 'bold',
  },
  containBtnBack: {
    position: 'absolute',
    top: 10,
    left: 7,
    zIndex: 1000,
  },
  imageSection: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  imageButton: {
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: FontSizeText.fsSmall,
  },
  imagePreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  image: {
    width: WIDTH,
    height: WIDTH,
    marginBottom: 20,
    borderRadius: 10,
    zIndex: 10,
  },
  containDropdown: {
    marginBottom: 30,
  },
  btnSclose: {
    position: 'absolute',
    top: -5,
    right: -5,
    zIndex: 1000,
  },
});