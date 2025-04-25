import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopTabViewAdmin from '../../../Navigation/TopTabViewAdmin';


const MananageScreen = () => {
//   const {refetch} = useGetAllOrderQuery(undefined);
//   const {refetch: refetchAllChat} = useGetAllChatRoomQuery(undefined);
//   const [chatRoomId, setChatRoomId] = useState<string>('default');
//   const chatRoomIdCuts = chatRoomId.split('/');
//   const {refetch: refetchChat} = useGetChatRoomByIdQuery(chatRoomIdCuts[0], {
//     skip: chatRoomId === 'default',
//   });
//   const currentScreen = useSelector(
//     (state: RootState) => state.currentScreen.currentScreen,
//   );
//   const [updateStatusMsg, {isLoading, isSuccess, isError, error}] =
//     useUpdateStatusMsgMutation();
//   useEffect(() => {
//     if (chatRoomId !== 'default') {
//       refetchChat();
//     }
//   }, [chatRoomId, refetchChat]);
//   const user = useSelector((state: RootState) => state.user);
//   useEffect(() => {
//     createWebSocketClient(`ws://${WS_URL}`);
//     const client = getWebSocketClient();
//     client.onmessage = msg => {
//       let cleanedData = msg.data.replace(/^"|"$/g, '');
//       let parts = cleanedData.split('/');
//       if (parts[2] === 'BuyProduct') {
//         console.log('refetch orders');
//         PushNotification.localNotification({
//           channelId: 'default-channel-id',
//           title: 'Thông báo',
//           message: 'Có đơn hàng mới, vui lòng kiểm tra',
//           playSound: true,
//           soundName: 'default',
//         });
//         refetch();
//       } else if (parts[3] === 'message' && user.role === 'Admin') {
//         setChatRoomId(parts[1] + 'admin' + '/' + getUniqueID());
//         PushNotification.localNotification({
//           channelId: 'default-channel-id',
//           title: parts[2],
//           message: ` ${parts[4]}`,
//           playSound: true,
//           soundName: 'default',
//         });
//         console.log(currentScreen);
//         if (currentScreen === 'Chat') {
//           console.log('Đang ở trong màn hình chat');
//           updateStatusMsg(parts[1] + 'admin');
//         }
//         refetchAllChat();
//       }
//     };
//   }, [user]);
//   useEffect(() => {
//     if (isSuccess) {
//       refetchAllChat();
//     }
//   }, [isSuccess]);
  return <TopTabViewAdmin />;
};

export default MananageScreen;

const styles = StyleSheet.create({});