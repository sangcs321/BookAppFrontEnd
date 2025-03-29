import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../Utils/Constants/Colors';
type Props = {
  text: String;
};
const TitleComponent: React.FC<Props> = ({text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{text}</Text>
    </View>
  );
};

export default TitleComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 7,
  },
  txt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
});
