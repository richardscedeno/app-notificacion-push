import { Component, OnInit } from '@angular/core';

//mis importaciones
import { Platform } from '@ionic/angular';

import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

//const { notifiionPush } = Plugin;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{

  constructor(private platform:Platform) {}

  ngOnInit() {
    console.log('Inicializando...');

    if(this.platform.is('capacitor')){

      // Request permission to use push notifications
      // iOS will prompt user and return if they granted permission or not
      // Android will just grant without prompting
      PushNotifications.requestPermissions().then(result => {
        if (result.receive === 'granted') {
          console.log('Permisos concedidos');
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });
    
      PushNotifications.addListener('registration', (token: Token) => {
        alert('Push registration success, token: ' + token.value);
      });
      
      PushNotifications.addListener('registrationError', (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      });
      

      //Se ejecuta cuando está en primer plano la app (cuando está abierta)
      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification: PushNotificationSchema) => {
          alert('Push received: ' + JSON.stringify(notification));
        },
      );
      
      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification: ActionPerformed) => {
          alert('Push action performed: ' + JSON.stringify(notification));
        },
      );

    }else{
      console.log('PushNotifications.requestPermission() -> No es un dispositivo movil');
    }
  }
}
