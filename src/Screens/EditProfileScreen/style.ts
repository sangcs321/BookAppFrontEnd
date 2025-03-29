import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Constants/Colors";

export const styles = StyleSheet.create({
    containAvatar: {
      flex: 1,
      backgroundColor: Colors.tint,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 30,
    },
    containChangePw: {
      position: 'absolute',
      right: 5,
      bottom: 5,
      backgroundColor: 'white',
      borderRadius: 4,
      borderWidth: 0
    },
    txtChangePw: {
      fontSize: FontSizeText.fsSmall,
      color: Colors.tint,
      paddingHorizontal:10
    },
    avatarImage: {
      width: 70,
      height: 70,
      borderRadius: 99,
    },
    btnEdit: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 5,
      borderRadius: 99,
      position: 'absolute',
      bottom: 3,
      right: -5,
    },
    containInput: {
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingTop: 8,
      gap: 10,
    },
    txt: {
      fontSize: FontSizeText.fsSmall,
      color: Colors.darkGrey,
      position: 'absolute',
      left: 14,
      top: 5,
    },
    txtInput: {
      fontSize: FontSizeText.fsMedium,
      color: Colors.black,
    },
    indicator: {
      borderColor: Colors.lightGrey,
      borderWidth: 0.2,
      height: 0,
    },
    btn: {
      alignSelf: 'center',
      backgroundColor: Colors.tint,
      width: 100,
      padding: 10,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
    },
    txtBtn: {
      color: Colors.white,
      fontSize: FontSizeText.fsTitle,
      fontWeight: 'bold',
    },
    containModal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    OpModal: {
      width: 250,
      height: 150,
      backgroundColor: 'white',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnModal: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 15,
    },
    txtTitleModal: {
      fontSize: FontSizeText.fsLarge,
      color: Colors.colorText,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    containBtnBack: {
      position: 'absolute',
      top: 12,
      left: 13,
      zIndex: 1000,
    },
    containIcon: {
      width: 60,
      height: 60,
      padding: 5,
      backgroundColor: '#dcdcdc',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    txtIcon: {
      color: Colors.colorText,
      fontSize: FontSizeText.fsSmall,
    },
  });