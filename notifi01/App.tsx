import React, { useEffect } from 'react';
import { Alert, View, Button } from 'react-native';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

function App() {
  useEffect(() => {
    requestPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      //messaging().onMessage listener captures incoming messages when the app is in the foreground/ background/ closed state
      console.log('remoteMessage', JSON.stringify(remoteMessage));
      displayNotificationFirebase(remoteMessage);
    });

    return unsubscribe;
  }, []);

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
  };

  async function displayNotificationFirebase(remoteMessage) {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  async function displayLocalNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a local notification
    await notifee.displayNotification({
      title: 'Local Notification Title',
      body: 'Local notification body content',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Display Local Notification" onPress={() => displayLocalNotification()} />
    </View>
  );
}

export default App;
