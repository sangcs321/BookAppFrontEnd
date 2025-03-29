import { StyleSheet } from "react-native";
import { Colors } from "../../Utils/Constants/Colors";
import { FontSizeText } from "../../Utils/Constants/Font";

const styles = StyleSheet.create({
    containAvatar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.tint,
      padding: 10,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    avatarImage: {
      width: 70,
      height: 70,
      borderRadius: 99,
    },
    containInfor: {
      padding: 20,
    },
    txtHello: {
      color: Colors.white,
      fontSize: FontSizeText.fsSmall,
    },
    txtName: {
      color: Colors.white,
      fontSize: FontSizeText.fsTitle,
    },
    btnEdit: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 5,
      borderRadius: 99,
      position: 'absolute',
      bottom: 3,
      right: -5,
    },
    containConfirm: {
      flexDirection: 'row',
      gap: 5,
      marginTop: 10,
      paddingHorizontal: 10,
      justifyContent: 'center',
    },
    txtConfirm: {
      fontSize: FontSizeText.fsSmall,
      color: Colors.colorText,
    },
    containOrder: {
      padding: 10,
      marginTop: 10,
      backgroundColor: Colors.white,
    },
    txtOrder: {
      fontSize: FontSizeText.fsMedium,
      color: Colors.colorText,
      fontWeight: 'bold',
    },
    headerOrder: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 15,
    },
    txtHistory: {
      fontSize: FontSizeText.fsSmall,
      color: Colors.colorText,
    },
    containStatusOrder: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 15,
    },
    btnStatusOrder: {
      alignItems: 'center',
    },
    txtStatusOrder: {
      fontSize: FontSizeText.fsSmall,
      color: Colors.colorText,
    },
    btnSignOut: {
      position: 'absolute',
      bottom: 10,
      alignSelf: 'center',
    },
    txtSignOut: {
      textDecorationLine: 'underline',
      fontSize: FontSizeText.fsMedium,
      color: Colors.tint,
    },
    badge: {
      position: 'absolute',
      top: -7,
      right: 19,
      backgroundColor: 'red',
      borderRadius: 99,
      paddingHorizontal: 5,
      color: 'white'
    },
    badge_2:{
      position: 'absolute',
      top: -7,
      right: 10,
      backgroundColor: 'red',
      borderRadius: 99,
      paddingHorizontal: 5,
      color: 'white'
    },
    btnChat: {
      position:'absolute',
      top: 10,
      right: 10
    }
  });
  export default styles;