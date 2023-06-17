import React, { useEffect, useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
// import {Notifications } from 'expo'

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import ImageComponent from './components/ImageComponent.jsx'

const getToken = async() => {

  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token , 'push token');
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
  // try {
  //   const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //   let finalStatus = existingStatus;

  //   if (existingStatus !== 'granted') {
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     finalStatus = status;
  //   }

  //   if (finalStatus !== 'granted') {
  //     return;
  //   }

  //   // const tokenData = await Notifications.getExpoPushTokenAsync({ projectId: 'plantillaneti' });
  //   const projectId = 'plantillaneti'
  //   // const projectId = 'eduar21616/reactprueba'
  //   const tokenData = await Notifications.getExpoPushTokenAsync({projectId});
  //   const token = tokenData.data;

  //   console.log('Token de notificaciones push:', token);
  // } catch (error) {
    //   console.log('Error al obtener el token de notificaciones push:', error);
  // }
  // const { status } = await Notifications.getPermissionsAsync();

  // if (status !== 'granted') {
  //   const { status: newStatus } = await Notifications.requestPermissionsAsync();
  //   if (newStatus !== 'granted') {
  //     console.log('No se concedieron los permisos de notificaciones.');
  //     return;
  //   }
  // }
  
  //   const projectId = 'reactprueba'
  // const { data: token } = await Notifications.getExpoPushTokenAsync({projectId});
  // console.log('Token de notificaciones push:', token);
}


const App = () => {
  
  useEffect(()=>{
  getToken()
  },[])
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <ImageComponent/>
    </View>
  );
};

export default App