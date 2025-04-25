import { Dimensions,StyleSheet } from "react-native";
import { Colors } from "../../../../Utils/Constants/Colors";
import { FontSizeText } from "../../../../Utils/Constants/Font";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginTop: 10,
    },
  
    headerTopBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: Colors.tint,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 5,
      elevation: 2,
    },
    headerTopBarText: {
      color: Colors.white,
      fontSize: FontSizeText.fsMedium,
      fontWeight: 'bold',
    },
    header: {
      flexDirection: 'row',
      paddingVertical: 10,
      alignSelf: 'center',
    },
    col1: {
      flex: 1.2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    col2: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    col3: {
      flex: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    col4: {
      flex: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    row: {
      flexDirection: 'row',
      marginBottom: 8,
      elevation: 1,
      borderRadius: 3,
      paddingVertical: 10,
      borderColor: '#fff',
      backgroundColor: '#fff',
    },
    containCol2: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingRight: 2,
    },
    image: {
      flex: 3,
    },
    nameCol2: {
      flex: 7,
      color: Colors.colorText,
      fontSize: FontSizeText.fsSmall,
    },
    headingTxt: {
      color: Colors.colorText,
      fontWeight: 'bold',
    },
    rowTxt: {
      color: Colors.colorText,
      fontSize: FontSizeText.fsSmall,
    },filters: {
      left:55,
      flexDirection: 'row',
      gap: 15
    },inputFilter: {
      borderColor: '#B7B7B7',
      borderWidth: 1,
      marginVertical: 5,
      borderRadius: 8,
      height: 30,
      fontSize: 12,
      paddingVertical: 2
      
    },
    titleFilter: {
      alignItems: 'center'
    },
    txtTitleFilter: {
      color: Colors.colorText,
      fontWeight: 'bold',
      fontSize: FontSizeText.fsMedium
    },
    btnFilter: {
      alignSelf: 'center',
      marginTop: 5,
      paddingVertical: 3,
      paddingHorizontal: 15,
      backgroundColor: Colors.tint,
      borderRadius: 8,
      fontSize: FontSizeText.fsMedium,
      color: Colors.white,
      fontWeight: 'bold'
    },filterOrderCodeAndDate: {
      backgroundColor: '#fff',
      width: '70%',
      padding: 10,
      borderRadius: 8,
    }, containModal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },modal: {
      flex: 1,
      backgroundColor: 'white',
      width: Dimensions.get('screen').width ,
      borderRadius: 10
    }, rowAcc: {
      flexDirection: 'row',
      marginBottom: 8,
      elevation: 1,
      borderRadius: 3,
      paddingVertical: 20,
      borderColor: '#fff',
      backgroundColor: '#fff',
    },iconLock: {
      position: 'absolute',
      top: 2,
      right: 2,
      fontWeight: 'bold'
    }, filterStatus: {
      marginHorizontal: 10,
      marginVertical: 10,
      width: '50%',
    },txtNoOrders: {
      fontSize: FontSizeText.fsSmall,
      alignSelf: 'center',    
      paddingTop: 100
    }
  });
  