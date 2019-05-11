import { Component } from 'react';
import { PermissionsAndroid } from 'react-native';

export default class AndroidPermissions extends Component {

  async fineLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Olá',
          message: 'Para usar nosso app é necessário que você nos de acesso à sua localização',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the ACCESS_FINE_LOCATION');
      } else {
        await this.fineLocationPermission();
      }
    } catch (err) {
      console.warn(err);
    }
  }
}