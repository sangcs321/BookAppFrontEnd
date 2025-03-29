import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../Utils/Constants/Colors';
type Props = {
  visible: boolean;
};
const Loading: React.FC<Props> = ({visible}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <ActivityIndicator color={Colors.tint} size={'large'} />
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(205, 205, 205,0.5)', // Màu xám với độ trong suốt 50%
  },
});
